import type { Metadata } from "next";
import { BookingPageContent } from "@/components/booking-page-content";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Book a Deployment Call | Worktree",
  description: "Book a Worktree deployment introduction for managed business-agent workflows.",
  robots: { index: false, follow: false },
};

export default function DeployBookPage() {
  return (
    <WorktreeShell>
      <BookingPageContent />
    </WorktreeShell>
  );
}
