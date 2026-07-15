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
  const end = p.end ? formatMonth(p.end) : "Present";
  return `${formatMonth(p.start)} – ${end}`;
}
