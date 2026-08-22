import type { Metadata } from "next";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Partner Playbook",
  description: "Private Worktree enablement for authorized launch partners.",
});

export default function PartnerPortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
