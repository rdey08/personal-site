import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import {
  newsItemSchema,
  projectSchema,
  publicationSchema,
  researchThreadSchema,
  siteSchema,
  type NewsItem,
  type Project,
  type Publication,
  type ResearchThread,
  type Site,
} from "@/content/schema";

/**
 * Build-time content loader. All prose and facts live in /content as
 * Markdown/MDX with YAML frontmatter — never in components. Frontmatter is
 * validated with Zod; an invalid or missing field throws here, which fails
 * `next build` with the offending file and field named.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Entry<M> {
  meta: M;
  /** Raw MDX body, compiled by src/lib/mdx.tsx inside server components. */
  body: string;
}

function load<S extends z.ZodType>(
  schema: S,
  relPath: string,
): Entry<z.output<S>> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, relPath), "utf8");
  const { data, content } = matter(raw);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in content/${relPath}:\n${issues}`);
  }
  return { meta: parsed.data, body: content.trim() };
}

function loadDir<S extends z.ZodType>(
  schema: S,
  dir: string,
): Entry<z.output<S>>[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, dir))
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => load(schema, `${dir}/${f}`));
}

export function getSite(): Entry<Site> {
  return load(siteSchema, "site.mdx");
}

export function getResearchThreads(): Entry<ResearchThread>[] {
  return loadDir(researchThreadSchema, "research").sort(
    (a, b) => a.meta.order - b.meta.order,
  );
}

export function getResearchThread(
  slug: string,
): Entry<ResearchThread> | undefined {
  return getResearchThreads().find((t) => t.meta.slug === slug);
}

export function getPublications(): Entry<Publication>[] {
  return loadDir(publicationSchema, "publications").sort(
    (a, b) => b.meta.year - a.meta.year,
  );
}

export function getProjects(): Entry<Project>[] {
  return loadDir(projectSchema, "projects").sort(
    (a, b) => a.meta.order - b.meta.order,
  );
}

export function getProject(slug: string): Entry<Project> | undefined {
  return getProjects().find((p) => p.meta.slug === slug);
}

export function getNews(): Entry<NewsItem>[] {
  return loadDir(newsItemSchema, "news").sort((a, b) =>
    b.meta.date.localeCompare(a.meta.date),
  );
}
