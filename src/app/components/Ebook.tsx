export default function Ebook() {
  return (
    <section className="text-center my-16">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#002D62" }}>
        E-book zdarma
      </h2>
      <p className="mb-6" style={{ color: "#002D62" }}>
        <strong>EMOČNÍ RESTART</strong> – 7 dní návratu k sobě.
      </p>
      <a
        href="/ebook/emocni-restart.pdf"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
      >
        Stáhnout e-book
      </a>
      {/* Kniha: Táta na furt */}
<div className="rounded-2xl bg-white shadow-xl p-6 flex flex-col justify-between border border-gray-200">
  <div>
    <h3 className="text-xl font-bold text-[#002D62] mb-3">
      Táta na furt
    </h3>
    <p className="text-gray-700 mb-4 leading-relaxed">
      Autentická kniha inspirovaná tvým vlastním příběhem. Praktický průvodce 
      pro otce po rozchodu, kteří chtějí zvládnout emoce, udržet respekt a být 
      tátou na plný úvazek – i když život zrovna nehraje fér.
    </p>
  </div>

  <button
    disabled
    className="mt-4 w-full rounded-xl bg-gray-300 text-gray-600 py-3 font-semibold cursor-not-allowed"
  >
    Koupit (již brzy)
  </button>
</div>
    </section>
  )
}
