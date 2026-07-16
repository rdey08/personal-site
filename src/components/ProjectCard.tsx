import Link from "next/link";
import type { Project } from "@/content/schema";
import { MetaChips } from "./MetaChips";
import { ArrowRightIcon } from "./icons";

// A project card. Flagship-tier projects link to their detail page; others are
// self-contained cards (optional external links). Leadership entries are
// rendered by LeadershipList, not this component.
export function ProjectCard({
  project,
  eyebrow,
}: {
  project: Project;
  eyebrow?: string;
}) {
  const hasDetail = project.tier === "flagship";
  const inner = (
    <>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-serif text-2xl font-medium tracking-tight text-balance text-ink-strong">
          {project.title}
        </h3>
        {project.award && (
          <span className="rounded-sm bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
            {project.award}
          </span>
        )}
      </div>
      {project.context && (
        <p className="mt-2 text-sm text-ink-faint">{project.context}</p>
      )}
      <p className="mt-3 leading-relaxed text-pretty text-ink">
        {project.summary}
      </p>
      <div className="mt-5">
        <MetaChips items={project.stack} label="Stack" />
      </div>
      {hasDetail ? (
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read the write-up
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[--duration-fast] group-hover:translate-x-0.5" />
        </p>
      ) : (
        project.links && (
          <div className="mt-5 flex gap-4 text-sm font-medium">
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
        )
      )}
    </>
  );

  const cardClass =
    "group block rounded-md border border-line bg-paper-raised p-6 transition-all duration-[--duration-base] ease-[--ease-out-expo] sm:p-7";

  if (hasDetail) {
    // Linked card: full interactive affordance (lift + accent border).
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`${cardClass} hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] hover:shadow-[0_12px_32px_-18px_rgba(0,0,0,0.25)]`}
      >
        {inner}
      </Link>
    );
  }
  // Static card: no lift — hover affordance would falsely suggest a link.
  return <div className={cardClass}>{inner}</div>;
}
