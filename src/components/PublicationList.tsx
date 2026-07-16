import type { Publication } from "@/content/schema";

// Formats publications as citations, bolding the author whose surname matches
// `authorSurname` (Rupak) at whatever position it appears.
export function PublicationList({
  publications,
  authorSurname = "Dey",
}: {
  publications: { meta: Publication }[];
  authorSurname?: string;
}) {
  if (publications.length === 0) return null;
  return (
    <ol className="space-y-6">
      {publications.map(({ meta }, i) => (
        // Academic register: hanging indent — first line flush, wrapped
        // lines indented (padding-left + negative text-indent).
        <li key={i} className="pl-6 -indent-6 text-ink">
          <p className="leading-relaxed">
            {meta.authors.map((author, j) => {
              const isSelf = author.startsWith(`${authorSurname},`);
              return (
                <span key={j}>
                  {isSelf ? (
                    <strong className="text-ink-strong">{author}</strong>
                  ) : (
                    author
                  )}
                  {j < meta.authors.length - 1 ? "; " : ". "}
                </span>
              );
            })}
            {meta.href ? (
              <a
                href={meta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-strong"
              >
                {meta.title}
              </a>
            ) : (
              <span className="italic">{meta.title}</span>
            )}
            . {meta.venue}, {meta.year}.
          </p>
          <p className="mt-1 indent-0 text-sm text-ink-muted capitalize">
            {meta.type} · {meta.status}
          </p>
        </li>
      ))}
    </ol>
  );
}
