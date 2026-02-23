export default function Ebook() {
  return (
    <section id="ebooks" className="section py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002D62] mb-10 text-center md:text-left">
          Moje knihy & e-booky
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 1) Emoční restart */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="/emocnirestart.jpg"
              alt="Emoční restart"
              className="w-64 rounded-xl shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">Emoční restart: 7 dní k sobě</h3>
              <p className="text-gray-700 mb-4">
                Krátký program pro rodiče po těžkých chvílích. Mini-úkoly na 7 dní.
              </p>
              <button
                className="px-4 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed text-gray-500"
                disabled
              >
                Stáhnout zdarma (brzy)
              </button>
            </div>
          </div>

          {/* 2) Táta na furt */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="/tatanafurt.jpg"
              alt="Táta na furt"
              className="w-64 rounded-xl shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">Táta na furt (kniha)</h3>
              <p className="text-gray-700 mb-4">
                Plnohodnotná kniha o tom, jak být dobrý táta i po rozchodu.
                Autentická, praktická, lidská.
              </p>
              <button
                className="px-4 py-2 rounded-xl bg-gray-200 font-semibold cursor-not-allowed text-gray-500"
                disabled
              >
                Koupit (již brzy)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}