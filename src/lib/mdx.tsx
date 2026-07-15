import { MDXRemote } from "next-mdx-remote/rsc";

/**
 * Compiles an MDX body (from src/lib/content.ts) inside a server component
 * at build time. No client-side MDX, no runtime compilation. Custom
 * typographic components are added in Phase 2.5 (mdx-components).
 */
export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} />;
}
