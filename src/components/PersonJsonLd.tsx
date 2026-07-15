import { getSite } from "@/lib/content";

// schema.org Person for the home page. Helps search engines and knowledge
// panels resolve who this is. Email is deliberately omitted (PLAN §2.5).
export function PersonJsonLd() {
  const site = getSite().meta;
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: "https://rupakdey.com",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "New Mexico State University",
    },
    sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
    knowsAbout: [
      "Machine Learning",
      "Deep Learning",
      "Applied Artificial Intelligence",
      "Software Engineering",
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input involved.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
