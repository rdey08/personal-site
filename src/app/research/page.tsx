import type { Metadata } from "next";
import { getPublications, getResearchThreads } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { FlagshipCard } from "@/components/FlagshipCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { PublicationList } from "@/components/PublicationList";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Applied machine learning research (multi-branch LSTMs for predicting net primary productivity) and academic presentations.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  const threads = getResearchThreads();
  const publications = getPublications();

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
            </div>
          </Section>
        </Reveal>
      )}
    </>
  );
}
