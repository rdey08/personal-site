import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getCv, getSite } from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Rupak Dey, viewable and downloadable.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  const cv = getCv();
  const site = getSite().meta;

  // The CV is the PDF itself, shown in an inline viewer with a download
  // action. Both render only when the redacted PDF actually exists, so the
  // site never ships a dead link or an empty frame while the file is
  // pending; until then the note from content/cv.mdx renders instead.
  const pdfExists = fs.existsSync(
    path.join(process.cwd(), "public", ...site.cvPdf.split("/")),
  );

  return (
    <>
      <PageHeader
        title="Curriculum Vitae"
        lead={cv.meta.updated ? `Updated ${cv.meta.updated}` : undefined}
      />

      {pdfExists ? (
        <>
          <Section className="pb-5 print:hidden">
            <a
              href={site.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-paper transition-colors duration-[--duration-fast] hover:bg-accent-strong"
            >
              Download PDF ↓
            </a>
          </Section>
          <Section className="pb-16">
            <iframe
              src={site.cvPdf}
              title="Rupak Dey's CV (PDF)"
              className="h-[85vh] w-full rounded-md border border-line bg-paper-raised"
            />
          </Section>
        </>
      ) : (
        <Section className="py-8">
          <Prose>
            <Mdx source={cv.body} />
          </Prose>
        </Section>
      )}
    </>
  );
}
