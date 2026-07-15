// Server component. Contact links from site content; email is entity-obfuscated
// at the point of render (PLAN §2.5) via ObfuscatedEmail.

import { getSite } from "@/lib/content";
import { ObfuscatedEmail } from "./ObfuscatedEmail";

export function Footer() {
  const site = getSite().meta;
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <ObfuscatedEmail
            email={site.email}
            className="transition-colors duration-[--duration-fast] hover:text-accent"
          />
          <a
            href={site.links.github}
            className="transition-colors duration-[--duration-fast] hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={site.links.linkedin}
            className="transition-colors duration-[--duration-fast] hover:text-accent"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
