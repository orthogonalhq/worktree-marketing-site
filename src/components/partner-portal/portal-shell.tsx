import type { ReactNode } from "react";
import styles from "@/app/partners/portal.module.css";
import { ResilientNotionFrame } from "@/components/partner-portal/resilient-notion-frame";
import { SiteHeader } from "@/components/site-shell";

type PortalShellProps = {
  authenticated?: boolean;
  basePath: string;
  children: ReactNode;
  coverUrl?: string | null;
  title: string;
};

function PartnerSignOut({ basePath }: { basePath: string }) {
  const logoutHref = `${basePath}/logout`;

  return (
    <form className={styles.signOutForm} action={logoutHref} method="post">
      <button className={styles.signOutButton} type="submit">Sign out</button>
    </form>
  );
}

export function PortalShell({
  authenticated = false,
  basePath,
  children,
  coverUrl,
  title,
}: PortalShellProps) {
  return (
    <div
      className={`nous-design-system worktree-shell ${styles.portal}`}
      data-nous-theme="dark"
    >
      <SiteHeader
        theme="dark"
        action={authenticated ? <PartnerSignOut basePath={basePath} /> : undefined}
      />

      <div className={coverUrl ? `${styles.hero} ${styles.heroWithImage}` : styles.hero}>
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.heroImage} src={coverUrl} alt="" />
        ) : null}
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Private partner enablement</p>
          <h1>{title}</h1>
        </div>
      </div>

      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span>Worktree is a product of Orthogonal Labs Inc.</span>
        <a href="mailto:hello@orthg.nl">hello@orthg.nl</a>
      </footer>
    </div>
  );
}

export function PartnerPortalEmbed({
  basePath,
  src,
}: {
  basePath: string;
  src: string;
}) {
  return (
    <div
      className={`nous-design-system worktree-shell ${styles.portal} ${styles.embedPortal}`}
      data-nous-theme="dark"
    >
      <SiteHeader theme="dark" action={<PartnerSignOut basePath={basePath} />} />
      <ResilientNotionFrame src={src} />
    </div>
  );
}

export function PartnerAccessGate({
  basePath,
  error,
  nextPath,
}: {
  basePath: string;
  error?: string;
  nextPath: string;
}) {
  const formAction = `${basePath}/session`;

  return (
    <PortalShell basePath={basePath} title="Partner access">
      <section className={styles.loginPanel} aria-labelledby="partner-access-heading">
        <div>
          <p className={styles.eyebrow}>Authorized partners</p>
          <h2 id="partner-access-heading">Enter the shared access password.</h2>
          <p>
            This portal contains current Worktree positioning, commercial terms, technical context, and
            introduction guidance for launch partners.
          </p>
        </div>
        {error === "invalid" ? (
          <p className={styles.formError} role="alert">That password was not recognized.</p>
        ) : null}
        {error === "configuration" ? (
          <p className={styles.formError} role="alert">
            Partner access has not been configured on this deployment.
          </p>
        ) : null}
        <form className={styles.loginForm} action={formAction} method="post">
          <input type="hidden" name="next" value={nextPath} />
          <label htmlFor="partner-password">Password</label>
          <div className={styles.loginControls}>
            <input
              id="partner-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <button type="submit">Continue</button>
          </div>
        </form>
      </section>
    </PortalShell>
  );
}

export function PortalUnavailable({ basePath }: { basePath: string }) {
  return (
    <PortalShell authenticated basePath={basePath} title="Partner portal">
      <section className={styles.statusPanel}>
        <p className={styles.eyebrow}>Temporarily unavailable</p>
        <h2>The partner content source could not be loaded.</h2>
        <p>Please contact the Worktree team if the problem continues.</p>
      </section>
    </PortalShell>
  );
}
