export type SiteNavigationLink = {
  href: string;
  label: string;
  description: string;
};

export const productNavigationLinks = [
  {
    href: "/product",
    label: "Product overview",
    description: "What you receive with one managed deployment.",
  },
  {
    href: "/product/agents",
    label: "Worktree Agents",
    description: "A durable agent configured for a defined business role.",
  },
  {
    href: "/product/managed-operations",
    label: "Managed Operations",
    description: "Ongoing controls, evaluation, support, and improvement.",
  },
] satisfies ReadonlyArray<SiteNavigationLink>;

export const comparisonNavigationLink = {
  href: "/compare-ai-agent-approaches",
  label: "Compare approaches",
  description: "See how managed operations differs from packaged and self-operated agents.",
} satisfies SiteNavigationLink;

export const primaryNavigationLinks = [
  {
    href: "/use-cases",
    label: "Use cases",
    description: "Where agent workflows fit first.",
  },
  {
    href: "/security",
    label: "Security",
    description: "How access, controls, and operating boundaries are handled.",
  },
  {
    href: "/about",
    label: "About",
    description: "Why Worktree exists.",
  },
] satisfies ReadonlyArray<SiteNavigationLink>;

export const companyNavigationLinks = [
  primaryNavigationLinks[2],
  {
    href: "mailto:hello@orthg.nl",
    label: "Contact",
    description: "Reach the Worktree team.",
  },
] satisfies ReadonlyArray<SiteNavigationLink>;
