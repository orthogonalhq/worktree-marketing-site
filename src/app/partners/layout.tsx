import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Playbook | Worktree",
  description: "Private Worktree enablement for authorized launch partners.",
  robots: {
    follow: false,
    index: false,
  },
};

export default function PartnerPortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
