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
    </section>
  )
}
