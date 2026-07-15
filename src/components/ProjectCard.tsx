import Link from "next/link";
import type { Project } from "@/content/schema";
import { MetaChips } from "./MetaChips";

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
        <p className="mb-2 text-xs font-medium tracking-wide text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="text-xl font-medium text-ink-strong">{project.title}</h3>
        {project.award && (
          <span className="rounded-sm bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
            {project.award}
          </span>
        )}
      </div>
      {project.context && (
        <p className="mt-1 text-sm text-ink-muted">{project.context}</p>
      )}
      <p className="mt-3 leading-relaxed text-ink">{project.summary}</p>
      <div className="mt-4">
        <MetaChips items={project.stack} label="Stack" />
      </div>
      {hasDetail ? (
        <p className="mt-4 text-sm font-medium text-accent">
          Read the write-up{" "}
          <span className="inline-block transition-transform duration-[--duration-fast] group-hover:translate-x-0.5">
            →
          </span>
        </p>
      ) : (
        project.links && (
          <div className="mt-4 flex gap-4 text-sm font-medium">
            {project.links.github && (
              <a
                href={project.links.github}
                className="text-accent hover:text-accent-strong"
              >
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                className="text-accent hover:text-accent-strong"
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
    "group block rounded-sm border border-line bg-paper-raised p-6 transition-all duration-[--duration-base] ease-[--ease-out-expo] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]";

  if (hasDetail) {
    return (
      <Link href={`/projects/${project.slug}`} className={cardClass}>
        {inner}
      </Link>
    );
  }
  return <div className={cardClass}>{inner}</div>;
}
