"use client";

// Client component #2 (PLAN §2.3): open/close state for the small-screen menu.
// On desktop (sm+) the nav is plain server-rendered links and this component
// is display:none, so it contributes no interaction cost there.
//
// Deliberately a disclosure, not a modal: the panel is a dropdown under the
// header rather than a full-screen overlay, so it takes no focus trap and no
// inert on the rest of the page. Tab order simply continues into the content
// below, which is what a reader would expect from a menu they can see past.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Wraps both the toggle and the panel, so one outside test covers both. A
  // ref on the panel alone would treat a click on the toggle as "outside" and
  // close the menu the same tick the button reopened it.
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Dismissal that the user drove (Escape, tapping away). Focus goes back to
  // the trigger, because it is where they were and the panel that had focus
  // is now gone.
  const dismiss = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    // Tapping the page behind an open menu is the ordinary way to dismiss it
    // on a phone, and it did nothing here: the panel carried a ref that was
    // never read by any handler. pointerdown rather than click so it lands on
    // the first touch instead of waiting for the release.
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) dismiss();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, dismiss]);

  // Close on any route change, not just on a tap inside this panel. The
  // command palette navigates without touching this component, which used to
  // leave the menu sitting open on top of the page it had moved to. No focus
  // return here: the destination page should receive it, not the toggle.
  //
  // Adjusted during render rather than in an effect (React's documented
  // "resetting state when a prop changes" pattern). An effect would paint the
  // open panel over the new route for a frame before closing it, and would
  // trip react-hooks/set-state-in-effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <div ref={wrapRef} className="sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-ink-muted transition-colors duration-[--duration-fast] hover:bg-paper-sunken hover:text-ink-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="panel-rise absolute inset-x-0 top-full z-40 border-b border-line bg-paper-raised"
        >
          <nav
            aria-label="Primary, mobile"
            className="mx-auto flex max-w-4xl flex-col px-6 py-2"
          >
            {NAV_LINKS.map((link) => {
              // Same active test as the desktop NavLinks, which had the
              // current-page state and this panel did not, so on a phone
              // there was no indication of where you already were.
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`border-b border-line py-3 transition-colors duration-[--duration-fast] last:border-0 hover:text-accent ${
                    active ? "font-medium text-accent" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
