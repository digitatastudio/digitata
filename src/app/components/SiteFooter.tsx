export default function SiteFooter() {
  return (
    <footer className="py-10 bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} DIGITÁTA Studio</p>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#about" className="hover:text-white">O projektu</a>
          <a href="#services" className="hover:text-white">Jak ti pomůžu</a>
          <a href="#books" className="hover:text-white">Knihy</a>
          <a href="#contact" className="hover:text-white">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
}
