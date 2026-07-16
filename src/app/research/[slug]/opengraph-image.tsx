import { getResearchThread, getResearchThreads } from "@/lib/content";
import { articleCard, OG_SIZE } from "@/lib/og-card";

// Per-write-up OG card: the research title on the brand print-mat frame.

export const dynamic = "force-static";

// Required alongside `output: export`, same params as the page route.
export function generateStaticParams() {
  return getResearchThreads().map((t) => ({ slug: t.meta.slug }));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Research write-up by Rupak Dey";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thread = getResearchThread(slug);
  return articleCard({
    eyebrow: "Research",
    title: thread?.meta.title ?? "Research",
  });
}
