import Link from "next/link";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-5xl font-medium text-accent">404</p>
      <h1 className="mt-4 text-2xl font-medium text-ink-strong">
        Page not found
      </h1>
      <p className="mt-2 text-ink-muted">
        That page doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm font-medium text-accent hover:text-accent-strong"
      >
        ← Back home
      </Link>
    </Section>
  );
}
