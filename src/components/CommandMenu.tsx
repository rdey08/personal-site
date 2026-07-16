"use client";

// Client component #5 (PLAN §2.3 amendment): command palette (⌘K / Ctrl+K).
// Justification: keyboard-first navigation is runtime-only by nature — there
// is no static rendering of "listen for a shortcut, filter as I type".
// Zero dependencies: a native <dialog> provides the focus trap, Escape
// handling, and backdrop. Command *data* (nav routes, work items, links)
// comes from the server via props — content never lives in client code.

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";

export interface Command {
  group: string;
  label: string;
  /** Internal path or external URL (externals open in a new tab). */
  href?: string;
  /** Built-in action instead of a navigation. */
  action?: "theme-light" | "theme-dark";
}

// Platform never changes at runtime; useSyncExternalStore reads it once,
// hydration-safe (server assumes non-Mac, client corrects before paint).
const noopSubscribe = () => () => {};
const isMacSnapshot = () => /Mac|iPhone|iPad/.test(navigator.platform);
const isMacServerSnapshot = () => false;

const THEME_COMMANDS: Command[] = [
  { group: "Theme", label: "Switch to light theme", action: "theme-light" },
  { group: "Theme", label: "Switch to dark theme", action: "theme-dark" },
];

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // storage unavailable — theme still applies for the session
  }
  window.dispatchEvent(new Event("themechange"));
}

export function CommandMenu({ commands }: { commands: Command[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    isMacSnapshot,
    isMacServerSnapshot,
  );

  const all = useMemo(() => [...commands, ...THEME_COMMANDS], [commands]);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? all.filter((c) => c.label.toLowerCase().includes(q))
    : all;

  function open() {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function run(cmd: Command) {
    close();
    if (cmd.action === "theme-light") applyTheme("light");
    else if (cmd.action === "theme-dark") applyTheme("dark");
    else if (cmd.href) {
      // App routes go through the client router; files (/feed.xml) and
      // external URLs open in a new tab.
      if (cmd.href.startsWith("/") && !cmd.href.includes("."))
        router.push(cmd.href);
      else window.open(cmd.href, "_blank", "noopener,noreferrer");
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[Math.min(active, filtered.length - 1)];
      if (cmd) run(cmd);
    }
  }

  // Rows grouped in listed order; the active row is tracked by flat index.
  let flatIndex = -1;
  const groups = [...new Set(filtered.map((c) => c.group))];

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open command menu"
        className="hidden h-9 items-center gap-1.5 rounded-sm px-2.5 text-xs font-medium text-ink-muted transition-colors duration-[--duration-fast] hover:bg-paper-sunken hover:text-ink-strong sm:inline-flex"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <kbd className="font-sans tracking-wide">{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Command menu"
        onClick={(e) => {
          // Click on the backdrop (the dialog element itself) closes.
          if (e.target === dialogRef.current) close();
        }}
        className="panel-rise mx-auto mt-[16vh] w-[min(90vw,34rem)] rounded-md border border-line bg-paper-raised p-0 text-ink shadow-[var(--shadow-card-hover)] backdrop:bg-black/45"
      >
        <div className="border-b border-line px-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Type to search…"
            aria-label="Search commands"
            className="w-full bg-transparent py-3.5 text-base text-ink-strong outline-none placeholder:text-ink-faint"
          />
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-ink-faint">
              No matches.
            </p>
          )}
          {groups.map((group) => (
            <div key={group}>
              <p className="px-3 pt-3 pb-1 text-xs font-semibold tracking-[0.08em] text-ink-faint uppercase">
                {group}
              </p>
              {filtered
                .filter((c) => c.group === group)
                .map((cmd) => {
                  flatIndex += 1;
                  const i = flatIndex;
                  return (
                    <button
                      key={`${cmd.group}-${cmd.label}`}
                      type="button"
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(cmd)}
                      className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors duration-[--duration-fast] ${
                        i === active
                          ? "bg-accent-soft text-ink-strong"
                          : "text-ink"
                      }`}
                    >
                      <span className="truncate">{cmd.label}</span>
                      {cmd.href && !cmd.href.startsWith("/") && (
                        <span className="ml-3 shrink-0 text-xs text-ink-faint">
                          ↗
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}
