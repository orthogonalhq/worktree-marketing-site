import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import deployGate from "@/config/deploy-form-gate.json";

const MAX_BODY_BYTES = 16_000;
const MIN_FORM_COMPLETION_MS = 1_500;
const MAX_FORM_COMPLETION_MS = 24 * 60 * 60 * 1_000;
const RATE_LIMIT_WINDOW_SECONDS = 15 * 60;
const RATE_LIMIT_MAX_IP_ATTEMPTS = 5;
const RATE_LIMIT_MAX_EMAIL_ATTEMPTS = 3;

const roleOptions = ["Founder / executive", "Operations leader", "Revenue / customer leader", "Finance / admin leader", "Technical / systems leader", "Individual contributor", "Other"];
const businessStageOptions = ["Just starting", "Under $500K annual revenue", "$500K–$1M annual revenue", "$1M–$5M annual revenue", "$5M–$10M annual revenue", "$10M+ annual revenue"];
const functionAreaOptions = ["Revenue / sales", "Customer success", "Support", "Finance / admin", "Internal operations", "Cross-functional", "Other"];
const motivationOptions = ["Freeing yourself from repetitive work", "Unblocking team members", "Avoiding hiring for a small recurring job", "Keeping follow-ups from slipping", "Making the process run without constant supervision", "Other"];
const frequencyOptions = ["Multiple times a minute", "Every few minutes", "Hourly", "Daily", "Weekly", "Monthly or less", "Not sure"];
const systemOptions = ["Email", "Slack / Teams", "CRM", "Support desk", "Docs / Drive / SharePoint", "Project / task system", "Billing / finance", "Data warehouse / BI", "Other"];
const timelineOptions = ["Now — we have a workflow in mind", "This quarter", "Researching options", "Not urgent yet"];

const roleSignals = new Set(deployGate.signals.roles);
const businessStageSignals = new Set(deployGate.signals.businessStages);
const frequencySignals = new Set(deployGate.signals.frequencies);
const timelineSignals = new Set(deployGate.signals.timelines);

function option(options: string[]) {
  return z.string().trim().refine((value) => options.includes(value), "Invalid selection");
}

function optionalText(maxLength: number) {
  return z.string().trim().max(maxLength).optional().default("");
}

const submissionSchema = z.object({
  idempotencyKey: z.uuid(),
  role: option(roleOptions),
  roleOther: optionalText(120),
  businessStage: option(businessStageOptions),
  functionArea: option(functionAreaOptions),
  functionAreaOther: optionalText(120),
  workflow: z.string().trim().min(deployGate.workflowMinimumCharacters).max(4_000),
  motivation: option(motivationOptions),
  motivationOther: optionalText(240),
  frequency: option(frequencyOptions),
  systems: z.array(option(systemOptions)).min(1).max(systemOptions.length).refine((values) => new Set(values).size === values.length, "Duplicate systems are not allowed"),
  specificTools: optionalText(500),
  timeline: option(timelineOptions),
  email: z.string().trim().email().max(254),
  name: z.string().trim().min(1).max(160),
  company: z.string().trim().min(1).max(200),
  phone: optionalText(80),
  website: z.string().max(0).optional().default(""),
  formStartedAt: z.number().int().positive(),
  privacyAccepted: z.literal(true),
}).superRefine((submission, context) => {
  if (submission.role === "Other" && !submission.roleOther) {
    context.addIssue({ code: "custom", path: ["roleOther"], message: "Please describe your role" });
  }

  if (submission.functionArea === "Other" && !submission.functionAreaOther) {
    context.addIssue({ code: "custom", path: ["functionAreaOther"], message: "Please describe the function" });
  }

  if (submission.motivation === "Other" && !submission.motivationOther) {
    context.addIssue({ code: "custom", path: ["motivationOther"], message: "Please describe the motivation" });
  }

  if (submission.systems.includes("Other") && !submission.specificTools) {
    context.addIssue({ code: "custom", path: ["specificTools"], message: "Please describe the other system" });
  }

  const completionTime = Date.now() - submission.formStartedAt;
  if (completionTime < MIN_FORM_COMPLETION_MS || completionTime > MAX_FORM_COMPLETION_MS) {
    context.addIssue({ code: "custom", path: ["formStartedAt"], message: "Invalid form completion time" });
  }
});

type DeploySubmission = z.infer<typeof submissionSchema>;

class SubmissionPersistenceError extends Error {}

function scoreSubmission(submission: DeploySubmission) {
  let score = 0;

  if (roleSignals.has(submission.role)) score += 1;
  if (businessStageSignals.has(submission.businessStage)) score += 1;
  if (frequencySignals.has(submission.frequency)) score += 1;
  if (timelineSignals.has(submission.timeline)) score += 1;
  if (submission.systems.length >= deployGate.signals.minimumSystemsSelected) score += 1;

  return score;
}

function canBookDeployment(submission: DeploySubmission, score: number) {
  return submission.workflow.length >= deployGate.workflowMinimumCharacters && score >= deployGate.minimumSignalsToBook;
}

function getSupabaseConfiguration() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_DEPLOY_TABLE ?? "deploy_submissions";

  if (!url || !serviceRoleKey) throw new SubmissionPersistenceError("Supabase is not configured");

  return { serviceRoleKey, table, url: url.replace(/\/$/, "") };
}

function requestHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function hashRateLimitKey(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function getRequestIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

async function consumeRateLimit(key: string, maxAttempts: number) {
  const { serviceRoleKey, url } = getSupabaseConfiguration();
  const response = await fetch(`${url}/rest/v1/rpc/consume_deploy_submission_rate_limit`, {
    method: "POST",
    headers: requestHeaders(serviceRoleKey),
    body: JSON.stringify({ p_key: key, p_max_attempts: maxAttempts, p_window_seconds: RATE_LIMIT_WINDOW_SECONDS }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new SubmissionPersistenceError("Rate limit check failed");

  return (await response.json()) === true;
}

async function insertIntoSupabase(submission: DeploySubmission, score: number, canBook: boolean) {
  const { serviceRoleKey, table, url } = getSupabaseConfiguration();
  const response = await fetch(`${url}/rest/v1/${encodeURIComponent(table)}?on_conflict=idempotency_key&select=id`, {
    method: "POST",
    headers: { ...requestHeaders(serviceRoleKey), Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({
      idempotency_key: submission.idempotencyKey,
      role: submission.role,
      role_other: submission.roleOther || null,
      business_stage: submission.businessStage,
      function_area: submission.functionArea,
      function_area_other: submission.functionAreaOther || null,
      workflow: submission.workflow,
      motivation: submission.motivation,
      motivation_other: submission.motivationOther || null,
      frequency: submission.frequency,
      systems: submission.systems,
      specific_tools: submission.specificTools || null,
      timeline: submission.timeline,
      email: submission.email,
      name: submission.name,
      company: submission.company,
      phone: submission.phone || null,
      score,
      can_book: canBook,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new SubmissionPersistenceError(`Supabase insert failed with status ${response.status}`);

  const result = await response.json() as unknown;
  if (!Array.isArray(result) || typeof result[0]?.id !== "string") {
    throw new SubmissionPersistenceError("Supabase did not return a submission identifier");
  }

  return result[0].id;
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission is too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Submission is too large" }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const parsedSubmission = submissionSchema.safeParse(body);
  if (!parsedSubmission.success) {
    return NextResponse.json({ error: "Please review the required fields and try again." }, { status: 400 });
  }

  const submission = parsedSubmission.data;
  if (submission.website) {
    return NextResponse.json({ error: "Unable to submit this form" }, { status: 400 });
  }

  try {
    const { serviceRoleKey } = getSupabaseConfiguration();
    const rateLimitSecret = process.env.DEPLOY_RATE_LIMIT_SECRET ?? serviceRoleKey;
    const ipAllowed = await consumeRateLimit(`ip:${hashRateLimitKey(getRequestIp(request), rateLimitSecret)}`, RATE_LIMIT_MAX_IP_ATTEMPTS);
    const emailAllowed = await consumeRateLimit(`email:${hashRateLimitKey(submission.email.toLowerCase(), rateLimitSecret)}`, RATE_LIMIT_MAX_EMAIL_ATTEMPTS);

    if (!ipAllowed || !emailAllowed) {
      return NextResponse.json({ error: "Please wait before submitting another workflow." }, { status: 429 });
    }

    const score = scoreSubmission(submission);
    const canBook = canBookDeployment(submission, score);
    const submissionId = await insertIntoSupabase(submission, score, canBook);

    console.info("deploy_submission_persisted", { canBook, score, submissionId });
    return NextResponse.json({ canBook, submissionId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("deploy_submission_failed", { message });
    return NextResponse.json({ error: "We could not save your workflow. Please try again or email hello@orthg.nl." }, { status: 503 });
  }
}
