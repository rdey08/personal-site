// Server shell. Sticky glass header: translucent paper + backdrop blur so
// content scrolls beneath it. Client islands: NavLinks (active route),
// ThemeToggle, MobileNav.

import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-tight text-ink-strong transition-colors duration-[--duration-fast] hover:text-accent"
        >
          Rupak Dey
        </Link>

        <div className="flex items-center gap-1">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 sm:flex"
          >
            <NavLinks />
          </nav>
          <div className="ml-3 flex items-center gap-1">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
