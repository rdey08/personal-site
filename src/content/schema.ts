import { z } from "zod";

/**
 * Frontmatter schemas for everything under /content.
 * Validation runs at build time; a bad field fails `next build` with the
 * offending file and field named (see src/lib/content.ts).
 */

const yearMonth = z
  .string()
  .regex(/^\d{4}-\d{2}$/, "expected YYYY-MM (e.g. 2025-09)");

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD");

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "expected kebab-case slug");

// content/site.mdx, singleton. Body: research-interest statement (MDX).
export const siteSchema = z.object({
  name: z.string().min(1),
  // Small-caps identity line above the name (degree · affiliation).
  eyebrow: z.string().min(1).optional(),
  // One-line availability signal (e.g. "Seeking PhD positions, Fall 20XX").
  availability: z.string().min(1).optional(),
  tagline: z.string().min(1),
  email: z.email(),
  location: z.string().min(1),
  links: z.object({
    github: z.url(),
    linkedin: z.url(),
    scholar: z.url().optional(),
    orcid: z.url().optional(),
  }),
  cvPdf: z.string().startsWith("/", "path under /public, e.g. /cv/file.pdf"),
});
export type Site = z.infer<typeof siteSchema>;

// content/research/*.mdx, body: the deep write-up (MDX).
export const researchThreadSchema = z.object({
  title: z.string().min(1),
  slug,
  role: z.string().min(1),
  org: z.string().min(1),
  period: z.object({
    start: yearMonth,
    end: z.union([yearMonth, z.literal("present")]),
  }),
  summary: z.string().min(1),
  methods: z.array(z.string().min(1)).min(1),
  order: z.number().int().nonnegative(),
  featured: z.boolean(),
});
export type ResearchThread = z.infer<typeof researchThreadSchema>;

// content/publications/*.mdx, frontmatter only.
export const publicationSchema = z.object({
  authors: z.array(z.string().min(1)).min(1),
  title: z.string().min(1),
  venue: z.string().min(1),
  year: z.number().int(),
  type: z.enum(["poster", "paper", "abstract", "talk"]),
  status: z.enum(["accepted", "published", "in-review"]),
  href: z.url().optional(),
});
export type Publication = z.infer<typeof publicationSchema>;

// content/projects/*.mdx, body required for flagship tier (deep write-up,
// rendered at /projects/[slug]); optional short paragraphs otherwise.
export const projectSchema = z.object({
  title: z.string().min(1),
  slug,
  role: z.string().min(1).optional(), // mainly for leadership entries
  period: z.object({
    start: yearMonth,
    end: z.union([yearMonth, z.literal("present")]).optional(),
  }),
  summary: z.string().min(1),
  stack: z.array(z.string().min(1)).default([]),
  award: z.string().min(1).optional(),
  context: z.string().min(1).optional(), // e.g. "Built at a hackathon"
  links: z
    .object({
      github: z.url().optional(),
      demo: z.url().optional(),
    })
    .optional(),
  tier: z.enum(["flagship", "project", "leadership"]),
  order: z.number().int().nonnegative(),
  featured: z.boolean(),
});
export type Project = z.infer<typeof projectSchema>;

// content/cv.mdx, singleton. Body: the HTML CV facts (education, summary).
export const cvSchema = z.object({
  updated: z.string().optional(),
});
export type Cv = z.infer<typeof cvSchema>;

// content/news/*.md, one item per file, sorted by date desc. The body
// (optional) is the story shown on the item's own page at /news/[slug];
// href points at related work and renders there as a "Related" link.
export const newsItemSchema = z.object({
  date: isoDate,
  slug,
  text: z.string().min(1),
  href: z.string().min(1).optional(), // related resource: internal path or external URL
  linkLabel: z.string().min(1).optional(), // label for the related link
});
export type NewsItem = z.infer<typeof newsItemSchema>;
