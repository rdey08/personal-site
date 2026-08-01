import Link from "next/link";
import type { Project } from "@/content/schema";
import { projectHasPage } from "@/lib/content";
import { MetaChips } from "./MetaChips";
import { ArrowRightIcon } from "./icons";

// Card for regular (non-flagship) projects, self-contained, with optional
// external links. Flagship work renders as FlagshipCard; leadership entries
// as LeadershipList.
export function ProjectCard({
  project,
  eyebrow,
}: {
  project: Project;
  eyebrow?: string;
}) {
  // A card links to its own page only once that page exists. The link is on
  // the title and stretches over the whole card via ::after, rather than
  // wrapping the card in an anchor: the GitHub and demo links live inside,
  // and nesting anchors is invalid. Those sit above the overlay on z-10.
  const href = projectHasPage(project) ? `/projects/${project.slug}` : null;

  return (
    <div
      className={`relative rounded-md border border-line bg-paper-raised p-6 transition-all duration-[--duration-base] ease-[--ease-out-expo] sm:p-7 ${
        href
          ? "group hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] hover:bg-paper-raised-hover hover:shadow-[var(--shadow-card-hover)]"
          : ""
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      {/* Two groups, so a full-width card can lay them side by side (see
          .card-grid in globals.css). In a normal two-up cell .card-split is a
          plain block and this is the same vertical stack as before. */}
      <div className="card-split">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="font-serif text-2xl font-medium tracking-tight text-balance text-ink-strong">
              {href ? (
                <Link
                  href={href}
                  className="transition-colors duration-[--duration-fast] after:absolute after:inset-0 after:content-[''] hover:text-accent"
                >
                  {project.title}
                </Link>
              ) : (
                project.title
              )}
            </h3>
            {project.award && (
              <span className="rounded-sm bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                {project.award}
              </span>
            )}
          </div>
          {/* Role sits directly under the title on team projects. Without it
              a card describing a product reads as a claim to have built all
              of it, which on a personal site is the failure mode that
              matters. */}
          {project.role && (
            <p className="mt-2 text-sm text-ink-muted">{project.role}</p>
          )}
          {project.context && (
            <p className="mt-1 text-sm text-ink-faint">{project.context}</p>
          )}
        </div>
        <div>
          {/* Capped so a wide card keeps a readable line length instead of
              stretching edge to edge. No effect in a two-up cell, which is
              already narrower than this. */}
          <p className="mt-3 max-w-[var(--measure)] leading-relaxed text-pretty text-ink">
            {project.summary}
          </p>
          <div className="mt-5">
            <MetaChips items={project.stack} label="Stack" />
          </div>
        </div>
      </div>
      {project.links && (
        <div className="relative z-10 mt-5 flex gap-4 text-sm font-medium">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors duration-[--duration-fast] hover:text-accent-strong"
            >
              GitHub
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors duration-[--duration-fast] hover:text-accent-strong"
            >
              Demo
            </a>
          )}
        </div>
      )}
      {/* Same affordance and wording as FlagshipCard, so "there is more to
          read" looks identical wherever it appears. Not a link itself: the
          title's stretched ::after already covers the card, and a second
          anchor to the same page would just add a duplicate tab stop. */}
      {href && (
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read the write-up
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5" />
        </p>
      )}
    </div>
  );
}
