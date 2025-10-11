export default function Cta() {
  return (
    <section id="cta" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#002D62] text-white shadow-2xl">
          {/* dekorativní jemný přechod */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#001a3d]/80 via-[#002D62] to-[#004080]/60" />

          <div className="relative z-10 px-8 py-12 md:px-14 md:py-16 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">
                Tvůj restart začíná dnes
              </h2>
              <p className="mt-4 text-lg opacity-95">
                Získej podporu, jasné kroky a konkrétní tipy. Mentoring 1:1,
                praktický obsah a komunita táty, co táhnou dopředu.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-[#002D62] shadow-lg transition hover:bg-yellow-300"
                >
                  Začít hned
                </a>

                
              </div>

              <ul className="mt-6 space-y-1 text-sm text-white/90">
                <li>• Osobní přístup a jasné kroky</li>
                <li>• Reálné zkušenosti, žádné kecy</li>
                <li>• Flexibilně online i osobně</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 md:p-8 backdrop-blur-md">
              <p className="text-white/95 md:text-lg">
                „Všechno začíná u tebe. Já ti dám&nbsp;nástroje a podporu,
                abys to zvládl a budoval lepší život pro sebe i své děti.“
              </p>
              <p className="mt-4 text-sm text-white/75">— Mira, DIGITÁTA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
