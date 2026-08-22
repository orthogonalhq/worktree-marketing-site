export type SiteNavigationLink = {
  href: string;
  label: string;
  description: string;
};

export const serviceNavigationLinks = [
  {
    href: "/services/ai-automation",
    label: "AI automation",
    description: "Find and redesign recurring work worth putting into motion.",
  },
  {
    href: "/services/ai-implementation",
    label: "AI implementation",
    description: "Define, build, test, and launch one valuable AI workflow.",
  },
  {
    href: "/services/managed-ai",
    label: "Managed AI",
    description: "Review, support, and improve a workflow after launch.",
  },
] as const satisfies ReadonlyArray<SiteNavigationLink>;

export const productNavigationLinks = [
  {
    href: "/product",
    label: "Product overview",
    description: "How agents, controls, and operating evidence fit together.",
  },
  {
    href: "/product/agents",
    label: "Worktree Agents",
    description: "A durable agent configured for a defined business role.",
  },
  {
    href: "/product/security",
    label: "Product Security",
    description: "Access boundaries, human review, data handling, and removal.",
  },
] as const satisfies ReadonlyArray<SiteNavigationLink>;

export const comparisonNavigationLink = {
  href: "/product/compare-ai-agent-approaches",
  label: "Compare approaches",
  description: "Compare the responsibilities left by packaged, self-operated, internal, and Worktree approaches.",
} satisfies SiteNavigationLink;

export const blogNavigationLink = {
  href: "/blog",
  label: "Blog",
  description: "Practical notes on redesigning and operating work with AI.",
} satisfies SiteNavigationLink;

export const primaryNavigationLinks = [
  {
    href: "/use-cases",
    label: "Use cases",
    description: "Where agent workflows fit first.",
  },
  {
    href: "/about",
    label: "About",
    description: "Why Worktree exists.",
  },
] satisfies ReadonlyArray<SiteNavigationLink>;

export const companyNavigationLinks = [
  primaryNavigationLinks[1],
  {
    href: "mailto:hello@orthg.nl",
    label: "Contact",
    description: "Reach the Worktree team.",
  },
] satisfies ReadonlyArray<SiteNavigationLink>;
