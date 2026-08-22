declare module "*.mdx" {
  import type { ComponentType } from "react";

  import type { ArticleMetadata } from "@/lib/blog/schema";

  export const metadata: ArticleMetadata;

  const MDXContent: ComponentType;
  export default MDXContent;
}
