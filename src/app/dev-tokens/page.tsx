// TEMPORARY design-token reference (PLAN §5, checklist 2.1).
// Delete this route before production deploy (checklist Phase 6).
// Uses inline var() styles so swatches render without Tailwind JIT safelisting.

const inks = [
  ["--ink-strong", "headings"],
  ["--ink", "body"],
  ["--ink-muted", "captions, meta"],
  ["--ink-faint", "least emphasis"],
] as const;
const surfaces = ["--paper", "--paper-raised", "--paper-sunken"] as const;
const accents = ["--accent", "--accent-strong", "--accent-soft"] as const;
const sizes = [
  "--text-5xl",
  "--text-4xl",
  "--text-3xl",
  "--text-2xl",
  "--text-xl",
  "--text-lg",
  "--text-base",
  "--text-sm",
  "--text-xs",
] as const;

export default function DevTokens() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 style={{ fontSize: "var(--text-4xl)" }}>Design tokens</h1>
      <p className="mt-2" style={{ color: "var(--ink-muted)" }}>
        Temporary reference. Terracotta accent on warm ink/paper. Toggle your OS
        light/dark to preview both themes.
      </p>

      <section className="mt-12">
        <h2 style={{ fontSize: "var(--text-2xl)" }}>Ink</h2>
        <div className="mt-4 space-y-2">
          {inks.map(([tok, use]) => (
            <p
              key={tok}
              style={{ color: `var(${tok})`, fontSize: "var(--text-lg)" }}
            >
              The quick brown fox jumps — <code>{tok}</code>{" "}
              <span style={{ color: "var(--ink-faint)" }}>({use})</span>
            </p>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 style={{ fontSize: "var(--text-2xl)" }}>Surfaces</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {surfaces.map((s) => (
            <div
              key={s}
              className="flex h-24 w-40 items-end rounded-sm p-2"
              style={{
                background: `var(${s})`,
                border: "1px solid var(--line)",
              }}
            >
              <code style={{ color: "var(--ink-muted)" }}>{s}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 style={{ fontSize: "var(--text-2xl)" }}>Accent</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {accents.map((a) => (
            <div
              key={a}
              className="flex h-24 w-40 items-end rounded-sm p-2"
              style={{ background: `var(${a})` }}
            >
              <code
                style={{ color: "var(--paper)", mixBlendMode: "difference" }}
              >
                {a}
              </code>
            </div>
          ))}
        </div>
        <p className="mt-4" style={{ fontSize: "var(--text-lg)" }}>
          Body text with an{" "}
          <a
            href="#dev"
            style={{ color: "var(--accent)" }}
            className="underline"
          >
            accent link
          </a>{" "}
          inline.
        </p>
      </section>

      <section className="mt-12">
        <h2 style={{ fontSize: "var(--text-2xl)" }}>Type scale</h2>
        <div className="mt-4 space-y-1">
          {sizes.map((s) => (
            <p key={s} style={{ fontSize: `var(${s})` }}>
              <span className="font-serif">Newsreader serif</span>{" "}
              <span className="font-sans">· Inter sans</span>{" "}
              <code
                style={{
                  color: "var(--ink-faint)",
                  fontSize: "var(--text-xs)",
                }}
              >
                {s}
              </code>
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
