import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { LeadershipList } from "@/components/LeadershipList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software engineering and projects — ELSA for NASA's Planetary Data System, plus hackathon and coursework projects — and leadership.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const flagship = projects.filter((p) => p.meta.tier === "flagship");
  const regular = projects.filter((p) => p.meta.tier === "project");
  const leadership = projects.filter((p) => p.meta.tier === "leadership");

  return (
    <>
      <PageHeader
        title="Projects"
        lead="From research infrastructure at NASA's Planetary Data System to hackathon builds and coursework."
      />

      {flagship.length > 0 && (
        <Section className="py-4">
          <div className="grid gap-5">
            {flagship.map((p) => (
              <ProjectCard
                key={p.meta.slug}
                project={p.meta}
                eyebrow="Flagship"
              />
            ))}
          </div>
        </Section>
      )}

      {regular.length > 0 && (
        <Section className="py-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {regular.map((p) => (
              <ProjectCard key={p.meta.slug} project={p.meta} />
            ))}
          </div>
        </Section>
      )}

      {leadership.length > 0 && (
        <Section className="py-8">
          <h2 className="mb-6 text-2xl font-medium text-ink-strong">
            Leadership &amp; Community
          </h2>
          <LeadershipList items={leadership} />
        </Section>
      )}
    </>
  );
}
