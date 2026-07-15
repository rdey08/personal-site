import type { MetadataRoute } from "next";
import { getProjects, getResearchThreads } from "@/lib/content";

const SITE_URL = "https://rupakdey.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/research", "/projects", "/cv"];
  const research = getResearchThreads().map((t) => `/research/${t.meta.slug}`);
  const flagship = getProjects()
    .filter((p) => p.meta.tier === "flagship")
    .map((p) => `/projects/${p.meta.slug}`);

  const now = new Date();
  return [...staticRoutes, ...research, ...flagship].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));
}
