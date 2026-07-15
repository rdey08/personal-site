import type { Metadata } from "next";
import { getPublications, getResearchThreads } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { ResearchCard } from "@/components/ResearchCard";
import { PublicationList } from "@/components/PublicationList";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Applied machine learning research — multi-branch LSTMs for predicting net primary productivity — and academic presentations.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  const threads = getResearchThreads();
  const publications = getPublications();

  return (
    <>
      <PageHeader
        title="Research"
        lead="Applied machine learning for scientific problems — fusing messy, multi-modal real-world data into predictions scientists can use."
      />

      <Section className="py-4">
        <div className="grid gap-5">
          {threads.map((t) => (
            <ResearchCard key={t.meta.slug} thread={t.meta} />
          ))}
        </div>
      </Section>

      {publications.length > 0 && (
        <Section className="py-12">
          <h2 className="mb-6 border-t border-line pt-5 font-serif text-2xl font-medium tracking-tight text-ink-strong">
            Publications &amp; Presentations
          </h2>
          <PublicationList publications={publications} />
        </Section>
      )}
    </>
  );
}
