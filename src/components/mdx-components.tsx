// Element styling for compiled MDX bodies (PLAN §2.2, §7). Passed to
// MDXRemote in src/lib/mdx.tsx. Each element is styled explicitly rather than
// pulling in the typography plugin, so the type rhythm matches the design
// tokens exactly.

import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

function Anchor({
  href = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const internal = href.startsWith("/") || href.startsWith("#");
  const className =
    "text-accent underline decoration-1 underline-offset-2 transition-colors duration-[--duration-fast] hover:text-accent-strong";
  if (internal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 mb-3 text-2xl font-medium text-ink-strong"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-2 text-xl font-medium text-ink-strong" {...props} />
  ),
  p: (props) => <p className="my-4 leading-[1.75]" {...props} />,
  a: Anchor,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-5" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-5" {...props} />,
  li: (props) => <li className="pl-1 leading-[1.7]" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-ink-strong" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-4 text-ink-muted italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-sm bg-paper-sunken px-1.5 py-0.5 font-mono text-[0.9em] text-ink-strong"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-sm bg-paper-sunken p-4 text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  figure: (props) => <figure className="my-8" {...props} />,
  figcaption: (props) => (
    <figcaption className="mt-2 text-sm text-ink-muted" {...props} />
  ),
};
