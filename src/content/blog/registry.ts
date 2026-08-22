import type { ComponentType } from "react";

import type { ArticleMetadata } from "@/lib/blog/schema";
import IbmAiTransformationWorkRedesign, { metadata as ibmAiTransformationWorkRedesignMetadata } from "./ibm-ai-transformation-work-redesign.mdx";

/**
 * Trusted, repository-local articles only. Add an MDX module here by importing
 * its default component and its explicit `metadata` export.
 */
export type RegisteredArticle = {
  metadata: ArticleMetadata;
  Component: ComponentType;
};

export const articleRegistry = [
  {
    metadata: ibmAiTransformationWorkRedesignMetadata,
    Component: IbmAiTransformationWorkRedesign,
  },
] as const satisfies readonly RegisteredArticle[];
