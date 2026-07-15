// Server component. Desktop nav is plain links (zero JS); the theme toggle and
// mobile menu are the only client islands.

import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="relative border-b border-line">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg font-medium text-ink-strong transition-colors duration-[--duration-fast] hover:text-accent"
        >
          Rupak Dey
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-6 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-muted transition-colors duration-[--duration-fast] hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-2 flex items-center">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
