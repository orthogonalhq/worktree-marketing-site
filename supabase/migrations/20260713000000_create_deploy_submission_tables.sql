create table if not exists public.deploy_submissions (
  id uuid primary key default gen_random_uuid(),
  idempotency_key uuid not null unique,
  role text not null,
  role_other text,
  business_stage text not null,
  function_area text not null,
  function_area_other text,
  workflow text not null,
  motivation text not null,
  motivation_other text,
  frequency text not null,
  systems text[] not null,
  specific_tools text,
  timeline text not null,
  email text not null,
  name text not null,
  company text not null,
  phone text,
  score integer not null,
  can_book boolean not null,
  reviewed_at timestamptz,
  reviewed_by text,
  created_at timestamptz not null default now()
);

create index if not exists deploy_submissions_unreviewed_idx
  on public.deploy_submissions (created_at desc)
  where reviewed_at is null;

create table if not exists public.deploy_submission_rate_limits (
  rate_key text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 1
);

alter table public.deploy_submissions enable row level security;
alter table public.deploy_submission_rate_limits enable row level security;

revoke all on table public.deploy_submissions from anon, authenticated;
revoke all on table public.deploy_submission_rate_limits from anon, authenticated;
grant all on table public.deploy_submissions to service_role;
grant all on table public.deploy_submission_rate_limits to service_role;

create or replace function public.consume_deploy_submission_rate_limit(
  p_key text,
  p_max_attempts integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_attempts integer;
  current_window_started_at timestamptz;
begin
  insert into public.deploy_submission_rate_limits (rate_key)
  values (p_key)
  on conflict (rate_key) do update
  set
    attempts = case
      when public.deploy_submission_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
        then 1
      else public.deploy_submission_rate_limits.attempts + 1
    end,
    window_started_at = case
      when public.deploy_submission_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds)
        then now()
      else public.deploy_submission_rate_limits.window_started_at
    end
  returning attempts, window_started_at into current_attempts, current_window_started_at;

  return current_attempts <= p_max_attempts;
end;
$$;

revoke all on function public.consume_deploy_submission_rate_limit(text, integer, integer) from public;
grant execute on function public.consume_deploy_submission_rate_limit(text, integer, integer) to service_role;
