import type { Metadata } from "next";
import { BookingPageContent } from "@/components/booking-page-content";
import { WorktreeShell } from "@/components/site-shell";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Book a Deployment Call",
  description: "Book a Worktree deployment introduction for managed business-agent workflows.",
});

export default function DeployBookPage() {
  return (
    <WorktreeShell>
      <BookingPageContent />
    </WorktreeShell>
  );
}
