import Link from "next/link";
import {
  getNews,
  getProject,
  getProjects,
  getResearchThreads,
  getSite,
} from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ResearchCard } from "@/components/ResearchCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsList } from "@/components/NewsList";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";

export default function Home() {
  const site = getSite();
  const research = getResearchThreads().find((t) => t.meta.featured);
  const elsa = getProject("elsa-pds");
  const featuredProjects = getProjects().filter(
    (p) => p.meta.featured && p.meta.tier === "project",
  );
  const news = getNews();

  return (
    <>
      {/* Hero — entrance stagger + signature accent underline (CSS only) */}
      <Section className="stagger pt-16 pb-4 sm:pt-24">
        <h1 className="inline-block text-4xl font-medium text-ink-strong sm:text-5xl">
          {site.meta.name}
          <span
            aria-hidden="true"
            className="draw-underline mt-1 block h-[3px] w-full rounded-full bg-accent"
          />
        </h1>
        <p className="mt-3 max-w-[52ch] text-lg text-ink-muted">
          {site.meta.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <a
            href={site.meta.links.github}
            className="text-accent hover:text-accent-strong"
          >
            GitHub
          </a>
          <a
            href={site.meta.links.linkedin}
            className="text-accent hover:text-accent-strong"
          >
            LinkedIn
          </a>
          <ObfuscatedEmail
            email={site.meta.email}
            className="text-accent hover:text-accent-strong"
          />
          <a
            href={site.meta.cvPdf}
            className="text-accent hover:text-accent-strong"
          >
            CV ↓
          </a>
        </div>
      </Section>

      {/* Research interest — the 30-second scan target */}
      <Reveal>
        <Section className="py-10">
          <div className="max-w-[var(--measure)] text-ink [&_p]:text-lg [&_p]:leading-[1.7]">
            <Mdx source={site.body} />
          </div>
        </Section>
      </Reveal>

      {/* Two flagship threads */}
      <Reveal>
        <Section className="py-10">
          <h2 className="mb-6 text-sm font-medium tracking-wide text-ink-muted uppercase">
            Selected work
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {research && (
              <ResearchCard thread={research.meta} eyebrow="Research" />
            )}
            {elsa && <ProjectCard project={elsa.meta} eyebrow="Engineering" />}
          </div>
        </Section>
      </Reveal>

      {/* Featured projects strip */}
      {featuredProjects.length > 0 && (
        <Reveal>
          <Section className="py-10">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-sm font-medium tracking-wide text-ink-muted uppercase">
                Projects
              </h2>
              <Link
                href="/projects"
                className="text-sm font-medium text-accent hover:text-accent-strong"
              >
                All projects →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {featuredProjects.map((p) => (
                <ProjectCard key={p.meta.slug} project={p.meta} />
              ))}
            </div>
          </Section>
        </Reveal>
      )}

      {/* News */}
      {news.length > 0 && (
        <Reveal>
          <Section className="py-10">
            <h2 className="mb-6 text-sm font-medium tracking-wide text-ink-muted uppercase">
              News
            </h2>
            <NewsList items={news} limit={5} />
          </Section>
        </Reveal>
      )}
    </>
  );
}
