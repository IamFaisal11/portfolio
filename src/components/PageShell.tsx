import Link from "next/link";

// Shared layout for the plain content pages (About, Privacy, Contact)
export default function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0f0f0f] px-6 py-24 text-white lg:px-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white">
          ← Home
        </Link>
        <h1 className="mb-12 mt-8 text-4xl font-light tracking-tight md:text-6xl">{title}</h1>
        <div className="space-y-6 text-base font-light leading-relaxed text-white/70 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc">
          {children}
        </div>
      </div>
    </main>
  );
}
