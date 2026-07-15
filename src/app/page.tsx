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
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ResearchCard } from "@/components/ResearchCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NewsList } from "@/components/NewsList";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import {
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";

const heroLink =
  "inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent";

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
      <PersonJsonLd />

      {/* Hero — serif display, entrance stagger, signature accent stroke */}
      <Section className="stagger pt-20 pb-10 sm:pt-28">
        <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
          {site.meta.location}
        </p>
        <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-balance text-ink-strong sm:text-6xl">
          {site.meta.name}
          <span
            aria-hidden="true"
            className="draw-underline mt-3 block h-[3px] w-24 rounded-full bg-accent"
          />
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg text-pretty text-ink-muted">
          {site.meta.tagline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={site.meta.links.github} className={heroLink}>
            <GitHubIcon />
            GitHub
          </a>
          <a href={site.meta.links.linkedin} className={heroLink}>
            <LinkedInIcon />
            LinkedIn
          </a>
          <ObfuscatedEmail email={site.meta.email} className={heroLink}>
            <MailIcon />
            Email
          </ObfuscatedEmail>
          <a href={site.meta.cvPdf} className={heroLink}>
            <FileIcon />
            CV
          </a>
        </div>
      </Section>

      {/* Research interest — the 30-second scan target, set as a serif lead */}
      <Reveal>
        <Section className="py-12">
          <div className="max-w-[38rem] font-serif text-[1.35rem] leading-[1.6] text-ink-strong [&_p]:mb-5 [&_p]:text-pretty last:[&_p]:mb-0">
            <Mdx source={site.body} />
          </div>
        </Section>
      </Reveal>

      {/* Two flagship threads */}
      <Reveal>
        <Section className="py-12">
          <SectionHeading index="01" title="Selected work" />
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
          <Section className="py-12">
            <SectionHeading
              index="02"
              title="Projects"
              action={
                <Link
                  href="/projects"
                  className="text-sm font-medium text-accent transition-colors duration-[--duration-fast] hover:text-accent-strong"
                >
                  All projects →
                </Link>
              }
            />
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
          <Section className="py-12">
            <SectionHeading index="03" title="News" />
            <NewsList items={news} limit={5} />
          </Section>
        </Reveal>
      )}
    </>
  );
}
