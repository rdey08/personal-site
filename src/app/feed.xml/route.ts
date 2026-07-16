import { getNews, getSite } from "@/lib/content";

// RSS 2.0 feed for the News stream, prerendered to a static file at build
// time (PLAN §2: everything ships static). Items come from /content/news.

export const dynamic = "force-static";

const SITE_URL = "https://rupakdey.com";

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET() {
  const site = getSite().meta;
  const items = getNews()
    .map(({ meta }) => {
      const link = meta.href
        ? meta.href.startsWith("/")
          ? `${SITE_URL}${meta.href}`
          : meta.href
        : `${SITE_URL}/news`;
      // Stable identity per item: date + a slug of the text.
      const guid = `${SITE_URL}/news#${meta.date}-${meta.text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .split(/\s+/)
        .slice(0, 6)
        .join("-")}`;
      return [
        "    <item>",
        `      <title>${esc(meta.text)}</title>`,
        `      <link>${esc(link)}</link>`,
        `      <guid isPermaLink="false">${esc(guid)}</guid>`,
        `      <pubDate>${new Date(`${meta.date}T12:00:00Z`).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} · News</title>
    <link>${SITE_URL}/news</link>
    <description>Milestones and updates from ${esc(site.name)}: research, awards, and events.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
