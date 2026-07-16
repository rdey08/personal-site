import Image from "next/image";
import Link from "next/link";
import {
  getNews,
  getProject,
  getProjects,
  getResearchThreads,
  getSite,
} from "@/lib/content";
import { Mdx } from "@/lib/mdx";
import { formatPeriod } from "@/lib/format";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FlagshipCard } from "@/components/FlagshipCard";
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

      {/* Hero — magazine plate: portrait anchors the left column (rotated
          photo-credit caption on its edge, scroll parallax), serif display
          text on the right, entrance stagger + signature accent stroke. */}
      <Section className="pt-16 pb-10 sm:pt-24">
        <div className="flex flex-col items-start gap-10 sm:grid sm:grid-cols-[auto_1fr] sm:items-center sm:gap-14 lg:gap-20">
          {/* Full 3:4 portrait as an editorial print: paper mat, offset
              accent backing, slight tilt that straightens on hover. */}
          <figure className="relative shrink-0 pl-5 sm:pl-6">
            <div className="sd-drift">
              <div className="place-print relative -rotate-[1.6deg] transition-transform duration-[--duration-slow] ease-[--ease-out-expo] hover:rotate-0">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-2 rounded-sm border border-line bg-accent-soft"
                />
                <div className="relative rounded-sm border border-line bg-paper-raised p-2 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/images/headshot-640.webp"
                    alt="Portrait of Rupak Dey"
                    width={640}
                    height={853}
                    priority
                    className="h-auto w-36 rounded-[2px] sm:w-52 lg:w-64"
                  />
                </div>
              </div>
            </div>
            <figcaption className="absolute bottom-1 left-0 text-[10px] font-semibold tracking-[0.22em] text-ink-faint uppercase [writing-mode:vertical-rl] rotate-180">
              {site.meta.location}
            </figcaption>
          </figure>

          <div className="stagger">
            {site.meta.eyebrow && (
              <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
                {site.meta.eyebrow}
              </p>
            )}
            <h1 className="font-serif text-5xl font-medium tracking-tight text-balance text-ink-strong sm:text-6xl lg:text-7xl">
              {site.meta.name}
              <span
                aria-hidden="true"
                className="draw-underline mt-3 block h-[3px] w-24 rounded-full bg-accent"
              />
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg text-pretty text-ink-muted lg:text-xl">
              {site.meta.tagline}
            </p>
            {site.meta.availability && (
              <p className="mt-5 flex items-baseline gap-2.5 text-sm font-medium text-ink-strong">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 self-center rounded-full bg-accent"
                />
                {site.meta.availability}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.meta.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={heroLink}
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={site.meta.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={heroLink}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <ObfuscatedEmail email={site.meta.email} className={heroLink}>
                <MailIcon />
                Email
              </ObfuscatedEmail>
              <a
                href={site.meta.cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className={heroLink}
              >
                <FileIcon />
                CV
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Research interest — the 30-second scan target, set as a serif lead.
          Scroll signature: rises as it enters. */}
      <Reveal>
        <Section className="py-12">
          <div className="sd-rise max-w-[38rem] font-serif text-[1.35rem] leading-[1.6] text-ink-strong [&_p]:mb-5 [&_p]:text-pretty last:[&_p]:mb-0">
            <Mdx source={site.body} />
          </div>
        </Section>
      </Reveal>

      {/* Two flagships as full-width split cards — the loudest unit on the
          page. Scroll signature: rule draws, cards slide in alternating. */}
      <Reveal>
        <Section className="py-12">
          <SectionHeading index="01" title="Selected work" />
          <div className="sd-cards grid gap-5">
            {research && (
              <FlagshipCard
                href={`/research/${research.meta.slug}`}
                eyebrow="Research"
                title={research.meta.title}
                metaLine={`${research.meta.org} · ${formatPeriod(research.meta.period)}`}
                summary={research.meta.summary}
                chips={research.meta.methods}
                chipsLabel="Methods"
              />
            )}
            {elsa && (
              <FlagshipCard
                href={`/projects/${elsa.meta.slug}`}
                eyebrow="Engineering"
                title={elsa.meta.title}
                metaLine={`${elsa.meta.role ?? "Software"} · ${formatPeriod(elsa.meta.period)}`}
                summary={elsa.meta.summary}
                chips={elsa.meta.stack}
                chipsLabel="Stack"
              />
            )}
          </div>
        </Section>
      </Reveal>

      {/* Featured projects strip — same grammar as Selected work. */}
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
            <div className="sd-cards grid gap-5 sm:grid-cols-2">
              {featuredProjects.map((p) => (
                <ProjectCard key={p.meta.slug} project={p.meta} />
              ))}
            </div>
          </Section>
        </Reveal>
      )}

      {/* News — 5 most recent; the rest live at /news. Scroll signature:
          a recessed full-bleed band, rows rising into it. */}
      {news.length > 0 && (
        <Reveal>
          <div className="mt-12 border-y border-line bg-paper-sunken/60">
            <Section className="py-12">
              <SectionHeading
                index="03"
                title="News"
                rule={false}
                action={
                  <Link
                    href="/news"
                    className="text-sm font-medium text-accent transition-colors duration-[--duration-fast] hover:text-accent-strong"
                  >
                    All news →
                  </Link>
                }
              />
              <div className="sd-rise">
                <NewsList items={news} limit={5} />
              </div>
            </Section>
          </div>
        </Reveal>
      )}
    </>
  );
}
