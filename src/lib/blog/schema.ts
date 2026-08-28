import { z } from "zod";

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slugs must be lowercase kebab-case.");

const dateSchema = z.string().refine(
  (value) => !Number.isNaN(Date.parse(value)),
  "Dates must be valid ISO-compatible date strings.",
);

const httpUrlSchema = z.url().refine(
  (value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  },
  "URLs must use http or https.",
);

export const articleImageSchema = z.object({
  src: z.string().trim().min(1),
  alt: z.string().trim().min(1, "Images must include meaningful alt text."),
}).strict();

export const articleSourceSchema = z.object({
  title: z.string().trim().min(1),
  url: httpUrlSchema,
}).strict();

export const articleMetadataSchema = z.object({
  slug: slugSchema,
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  publishedAt: dateSchema,
  updatedAt: dateSchema.optional(),
  authorId: slugSchema,
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().trim().min(1).optional(),
  seoDescription: z.string().trim().min(1).optional(),
  topic: z.string().trim().min(1).optional(),
  tags: z.array(slugSchema).min(1).max(6),
  featured: z.boolean().optional(),
  image: articleImageSchema.optional(),
  sources: z.array(articleSourceSchema).optional(),
  corrections: z.array(z.string().trim().min(1)).optional(),
}).strict().superRefine((article, context) => {
  if (article.updatedAt && Date.parse(article.updatedAt) < Date.parse(article.publishedAt)) {
    context.addIssue({
      code: "custom",
      path: ["updatedAt"],
      message: "updatedAt cannot be earlier than publishedAt.",
    });
  }

  if (new Set(article.tags).size !== article.tags.length) {
    context.addIssue({
      code: "custom",
      path: ["tags"],
      message: "Article tags must be unique.",
    });
  }
});

export type ArticleMetadata = z.infer<typeof articleMetadataSchema>;
