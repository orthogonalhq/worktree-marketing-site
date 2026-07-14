import type { Metadata } from "next";
import { DeployQuestionnaire } from "@/components/deploy-questionnaire";
import { WorktreeShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Deploy | Worktree",
  description: "Worktree deployment questionnaire for managed business-agent workflows.",
};

export default function DeployPage() {
  return (
    <WorktreeShell>
      <DeployQuestionnaire />
    </WorktreeShell>
  );
}
