// src/app/components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="py-10 bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} DIGITÁTA Studio
        </p>

        <nav className="flex items-center gap-5 text-sm">
          <Link href="/#about" className="hover:text-white" prefetch={false}>
            O projektu
          </Link>
          <Link href="/#services" className="hover:text-white" prefetch={false}>
            Jak ti pomůžu
          </Link>
          <Link href="/#books" className="hover:text-white" prefetch={false}>
            Knihy
          </Link>
          <Link href="/#contact" className="hover:text-white" prefetch={false}>
            Kontakt
          </Link>
          <Link href="/mentoring" className="hover:text-white" prefetch={false}>
            Mentoring 1:1
          </Link>
        </nav>
      </div>
    </footer>
  );
}