import { getSite } from "@/lib/content";

export default function Home() {
  const site = getSite().meta;
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">{site.name}</h1>
    </main>
  );
}
