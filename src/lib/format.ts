export function formatMonth(ym: string): string {
  if (ym === "present") return "Present";
  return new Date(`${ym}-01T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatPeriod(p: {
  start: string;
  end?: string | "present";
}): string {
  const start = formatMonth(p.start);
  const end = p.end ? formatMonth(p.end) : "Present";
  // Work that began and ended in one month is a month, not a range: a
  // hackathon build should read "Apr 2026", not "Apr 2026 - Apr 2026".
  if (start === end) return start;
  return `${start} – ${end}`;
}
