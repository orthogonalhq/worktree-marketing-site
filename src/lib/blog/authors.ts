import { z } from "zod";

export const authorSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Author IDs must be lowercase kebab-case."),
  name: z.string().trim().min(1),
  kind: z.enum(["organization", "person"]),
  url: z.url().optional(),
}).strict();

export type Author = z.infer<typeof authorSchema>;

/**
 * Add verified people here when they are approved for publication. Until then,
 * articles may use the organizational byline below.
 */
export const authors = {
  worktree: authorSchema.parse({
    id: "worktree",
    name: "Worktree",
    kind: "organization",
    url: "https://worktree.agency/about",
  }),
} as const satisfies Record<string, Author>;

export type AuthorId = keyof typeof authors;

export function getAuthor(authorId: string): Author | undefined {
  return authors[authorId as AuthorId];
}
