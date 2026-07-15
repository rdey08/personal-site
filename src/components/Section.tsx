// Server component. Consistent horizontal frame + vertical rhythm for page
// sections. The scroll-reveal wrapper (Reveal) is added in Phase 4.

import type { ReactNode } from "react";

export function Section({
  children,
  as: Tag = "section",
  className = "",
  id,
}: {
  children: ReactNode;
  as?: "section" | "div" | "article";
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={`mx-auto max-w-3xl px-6 ${className}`}>
      {children}
    </Tag>
  );
}
