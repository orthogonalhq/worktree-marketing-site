import type { ReactNode } from "react";

type Tone = "blue" | "green" | "amber" | "muted";

export type HeroMiniMockupData = {
  windowTitle: string;
  workspace: string;
  activeChannel: string;
  channels: string[];
  headerTitle: string;
  headerSubtitle: string;
  messages: Array<{
    author: string;
    badge?: string;
    meta: string;
    text: string;
    tone?: "agent" | "human";
  }>;
  chips: Array<{
    label: string;
    value: string;
    tone?: Tone;
  }>;
  toolLog: Array<{
    label: string;
    value: string;
    tone?: Tone;
  }>;
  composer: string;
};

export type StoryboardPhase = {
  id: string;
  tabLabel: string;
  tool: string;
  status: string;
  title: string;
  copy: string;
  rows: Array<{
    label: string;
    value: string;
    tone?: Tone;
  }>;
  artifacts: Array<{
    label: string;
    value: string;
  }>;
  bullets: string[];
};

function TonePill({ children, tone = "muted" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`story-pill story-pill-${tone}`}>{children}</span>;
}

function MiniMark() {
  return (
    <span className="story-mini-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function SlackMark() {
  return (
    <span className="story-slack-mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function HeroHeaderMiniMockup({ data }: { data: HeroMiniMockupData }) {
  return (
    <div className="story-hero-stage" aria-label="Worktree running inside an operations channel">
      <div className="story-hero-glow" aria-hidden="true" />
      {data.chips.map((chip, index) => (
        <div className={`story-float-chip story-float-chip-${index + 1}`} key={`${chip.label}-${chip.value}`}>
          <TonePill tone={chip.tone}>{chip.label}</TonePill>
          <strong>{chip.value}</strong>
        </div>
      ))}

      <div className="story-mini-window">
        <div className="story-mini-titlebar">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="story-titlebar-app">
            <SlackMark />
            <p className="mono-label text-[var(--nous-fg-muted)]">{data.windowTitle}</p>
          </div>
        </div>

        <div className="story-mini-app">
          <aside className="story-mini-sidebar">
            <div className="story-workspace">
              <SlackMark />
              <span>{data.workspace}</span>
            </div>
            <p className="story-sidebar-label">Channels</p>
            {data.channels.map((channel) => (
              <div className={channel === data.activeChannel ? "story-channel story-channel-active" : "story-channel"} key={channel}>
                {channel}
              </div>
            ))}
          </aside>

          <section className="story-mini-main">
            <header className="story-channel-header">
              <div>
                <h3>{data.headerTitle}</h3>
                <p>{data.headerSubtitle}</p>
              </div>
              <TonePill tone="green">Live run</TonePill>
            </header>

            <div className="story-messages">
              {data.messages.map((message) => (
                <article className="story-message" key={`${message.author}-${message.meta}-${message.text}`}>
                  <div className={message.tone === "agent" ? "story-avatar story-avatar-agent" : "story-avatar"}>
                    {message.tone === "agent" ? <MiniMark /> : message.author.slice(0, 1)}
                  </div>
                  <div>
                    <div className="story-message-head">
                      <strong>{message.author}</strong>
                      {message.badge ? <span>{message.badge}</span> : null}
                      <time>{message.meta}</time>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="story-tool-log" aria-label="Systems checked by Worktree">
              {data.toolLog.map((item) => (
                <div className="story-tool-row" key={`${item.label}-${item.value}`}>
                  <span>{item.label}</span>
                  <TonePill tone={item.tone}>{item.value}</TonePill>
                </div>
              ))}
            </div>

            <div className="story-composer">{data.composer}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function WatchItWorkStoryboard({ phases }: { phases: StoryboardPhase[] }) {
  return (
    <div className="watch-storyboard" aria-label="Three phase Worktree storyboard">
      <div className="watch-tabs" aria-label="Storyboard phases">
        {phases.map((phase, index) => (
          <a className="watch-tab" href={`#${phase.id}`} key={phase.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {phase.tabLabel}
          </a>
        ))}
      </div>

      <div className="watch-stage-shell">
        <div className="watch-device">
          {phases.map((phase, index) => (
            <article className="watch-phase-card" id={phase.id} key={phase.id}>
              <div className="watch-phase-topline">
                <div>
                  <p className="mono-label text-[var(--nous-page-preheader-fg)]">{phase.tool}</p>
                  <h3>{phase.title}</h3>
                </div>
                <TonePill tone={index === phases.length - 1 ? "amber" : "blue"}>{phase.status}</TonePill>
              </div>

              <div className="watch-work-surface">
                {phase.rows.map((row) => (
                  <div className="watch-work-row" key={`${phase.id}-${row.label}`}>
                    <span className="watch-row-dot" aria-hidden="true" />
                    <div>
                      <p>{row.label}</p>
                      <strong>{row.value}</strong>
                    </div>
                    <TonePill tone={row.tone}>Done</TonePill>
                  </div>
                ))}
              </div>

              <div className="watch-artifacts">
                {phase.artifacts.map((artifact) => (
                  <div className="watch-artifact" key={`${phase.id}-${artifact.label}`}>
                    <p>{artifact.label}</p>
                    <strong>{artifact.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="watch-copy-rail">
          {phases.map((phase, index) => (
            <article className="watch-copy-card" key={`${phase.id}-copy`}>
              <span className="watch-copy-index">0{index + 1}</span>
              <h3>{phase.tabLabel}</h3>
              <p>{phase.copy}</p>
              <ul>
                {phase.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span aria-hidden="true">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </aside>
      </div>
    </div>
  );
}
