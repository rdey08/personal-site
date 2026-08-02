import type { Metadata } from "next";

// Canonical site constants. Every file that needs the production origin or
// the sitewide description imports it from here, so a domain change is a
// one-line edit instead of a grep across routes, feeds, and JSON-LD.

export const SITE_URL = "https://rupakdey.com";

export const SITE_NAME = "Rupak Dey";

/**
 * Home page <title>. Deliberately carries no name: Google prints the site
 * name (from the WebSite JSON-LD, which resolves from SITE_NAME) on the line
 * directly above the title, so putting it here too made the result read
 * "Rupak Dey" on two consecutive lines. The split mirrors how a large site
 * reads in results, identity on one line and the specific page on the next.
 *
 * Also drives og:title and twitter:title. A social card loses the site-name
 * line, but the name still reaches it three ways: the OG image renders it,
 * og:site_name carries it, and SITE_DESCRIPTION opens with it.
 */
export const HOME_TITLE = "Applied ML Research and Software Engineering";

export const SITE_DESCRIPTION =
  "Rupak Dey: applied machine learning research (NMSU KDD Lab) and research-data software engineering (NASA Planetary Data System).";

/** Absolute URL for a site-relative path ("/research/x" -> full URL). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Page metadata with the Open Graph and Twitter fields filled in per page.
 * Next.js replaces a parent's `openGraph` wholesale rather than deep-merging
 * it, so a page that sets only `title` would otherwise ship the sitewide
 * og:title/og:description on its link previews.
 */
export function pageMetadata({
  title,
  description,
  path,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  /** ISO date; presence switches og:type from website to article. */
  publishedTime?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      ...(publishedTime
        ? { type: "article", publishedTime }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
