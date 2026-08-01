import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { getPublications, getResearchThreads, getSite } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { FlagshipCard } from "@/components/FlagshipCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { PublicationList } from "@/components/PublicationList";
import { OrcidIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Applied machine learning research (multi-branch LSTMs for predicting rangeland herbaceous biomass) and academic presentations.",
  path: "/research",
});

export default function ResearchPage() {
  const threads = getResearchThreads();
  const publications = getPublications();
  const site = getSite().meta;

  return (
    <>
      <PageHeader
        title="Research"
        lead="Applied machine learning for scientific problems: fusing messy, multi-modal real-world data into predictions scientists can use."
      />

      <Section className="py-4">
        <div className="sd-cards grid gap-5">
          {threads.map((t) => (
            <FlagshipCard
              key={t.meta.slug}
              href={`/research/${t.meta.slug}`}
              eyebrow="Research"
              title={t.meta.title}
              metaLine={`${t.meta.org} · ${formatPeriod(t.meta.period)}`}
              summary={t.meta.summary}
              chips={t.meta.methods}
              chipsLabel="Methods"
            />
          ))}
        </div>
      </Section>

      {publications.length > 0 && (
        <Reveal>
          <Section className="py-12">
            <SectionHeading title="Publications & Presentations" />
            <div className="sd-rise">
              <PublicationList publications={publications} />
              {/* The full iD with its mark, per ORCID's display guidelines.
                  This is where it earns its place: a reader who just looked at
                  a citation is exactly the one who wants the full record. */}
              {site.links.orcid && (
                <a
                  href={site.links.orcid}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="link-external mt-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
                >
                  <OrcidIcon className="h-4 w-4 shrink-0" />
                  <span className="tabular-nums">
                    {site.links.orcid.replace(/^https?:\/\//, "")}
                  </span>
                  <span aria-hidden="true" className="link-arrow text-accent">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </Section>
        </Reveal>
      )}
    </>
  );
}
