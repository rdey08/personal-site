import type { Metadata } from "next";
import { getCv, getSite } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Rupak Dey — education, focus, and skills.",
};

export default function CvPage() {
  const cv = getCv();
  const site = getSite().meta;

  return (
    <>
      <PageHeader title="Curriculum Vitae" />

      <Section className="pb-4">
        <a
          href={site.cvPdf}
          className="inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-paper transition-colors duration-[--duration-fast] hover:bg-accent-strong"
        >
          Download PDF ↓
        </a>
      </Section>

      <Section className="py-8">
        <Prose>
          <Mdx source={cv.body} />
        </Prose>
      </Section>
    </>
  );
}
