import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#0f0f0f] px-6 py-10 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-xs tracking-widest text-white/40">© {new Date().getFullYear()} Faisal. All rights reserved.</p>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-white/60">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
