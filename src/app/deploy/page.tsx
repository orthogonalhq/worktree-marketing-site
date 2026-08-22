import type { Metadata } from "next";
import { DeployQuestionnaire } from "@/components/deploy-questionnaire";
import { WorktreeShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Start a Deployment Review",
  description: "Worktree deployment questionnaire for managed business-agent workflows.",
  path: "/deploy",
});

export default function DeployPage() {
  return (
    <WorktreeShell>
      <DeployQuestionnaire />
    </WorktreeShell>
  );
}
