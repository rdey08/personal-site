// Server component. Renders an email as HTML numeric character references in
// both the mailto href and the visible text (PLAN §2.5). Browsers decode it
// normally; regex-based address scrapers reading the raw HTML see only
// entities, not `user@host`. Not encryption, a deliberate, cheap deterrent.

function encode(str: string): string {
  return Array.from(str)
    .map((ch) => `&#${ch.codePointAt(0)};`)
    .join("");
}

export function ObfuscatedEmail({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const href = encode(`mailto:${email}`);
  return (
    <a
      className={className}
      href={href}
      dangerouslySetInnerHTML={children ? undefined : { __html: encode(email) }}
    >
      {children}
    </a>
  );
}
