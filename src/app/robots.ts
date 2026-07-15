import type { MetadataRoute } from "next";

const SITE_URL = "https://rupakdey.com";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dev-tokens",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
