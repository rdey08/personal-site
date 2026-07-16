import type { Project } from "@/content/schema";
import { MetaChips } from "./MetaChips";

// Card for regular (non-flagship) projects — self-contained, with optional
// external links. Flagship work renders as FlagshipCard; leadership entries
// as LeadershipList.
export function ProjectCard({
  project,
  eyebrow,
}: {
  project: Project;
  eyebrow?: string;
}) {
  return (
    <div className="rounded-md border border-line bg-paper-raised p-6 sm:p-7">
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
      {project.links && (
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
      )}
    </div>
  );
}
