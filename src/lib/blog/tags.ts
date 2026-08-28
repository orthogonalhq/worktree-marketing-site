export const blogTags = {
  "ai-agents": { label: "AI agents" },
  evaluation: { label: "Evaluation" },
  governance: { label: "Governance" },
  implementation: { label: "Implementation" },
  "managed-operations": { label: "Managed operations" },
  "security-controls": { label: "Security and controls" },
  "workflow-design": { label: "Workflow design" },
  "cost-planning": { label: "Cost planning" },
} as const;

export type BlogTagId = keyof typeof blogTags;

export type BlogTag = {
  id: BlogTagId;
  label: (typeof blogTags)[BlogTagId]["label"];
};

export function getBlogTag(id: string): BlogTag | undefined {
  if (!(id in blogTags)) return undefined;

  const tagId = id as BlogTagId;
  return { id: tagId, label: blogTags[tagId].label };
}
