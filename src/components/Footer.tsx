// Server component. Two-tier editorial footer: contact row, then a colophon —
// the quiet craft signal for engineers who scroll to the bottom. Email is
// entity-obfuscated at render (PLAN §2.5).

import { getSite } from "@/lib/content";
import { ObfuscatedEmail } from "./ObfuscatedEmail";

const REPO_URL = "https://github.com/rdey08/personal-site";

export function Footer() {
  const site = getSite().meta;
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-serif text-lg text-ink-strong">{site.name}</p>
          <nav
            aria-label="Contact"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
          >
            <ObfuscatedEmail
              email={site.email}
              className="text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
            />
            <a
              href={site.links.github}
              className="text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={site.links.linkedin}
              className="text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={site.cvPdf}
              className="text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
            >
              CV
            </a>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-baseline sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <p>
            Set in Newsreader &amp; Inter · built with Next.js + MDX, statically
            exported ·{" "}
            <a
              href={REPO_URL}
              className="underline decoration-line underline-offset-2 transition-colors duration-[--duration-fast] hover:text-accent"
            >
              view source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
