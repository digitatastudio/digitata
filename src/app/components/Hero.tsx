"use client";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden text-center text-white">
      {/* Pozadí: čistý CSS gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#053569,_#00152a)]" />

    

      {/* Obsah */}
      <div className="relative z-10 px-4">
        <p className="mb-8 text-4xl md:text-6xl font-extrabold leading-tight text-white">
          Všechno začíná u <span className="text-white">tebe</span>.
          <br />
          Ty jsi <span className="text-white">úspěch</span>.
        </p>

        <button
          className="rounded-xl bg-[#002D62] px-10 py-4 text-base md:text-lg font-semibold shadow-xl transition hover:scale-105 hover:bg-[#003b8f]"
          onClick={() => {
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Začni teď
        </button>
      </div>

      {/* "Logo" vpravo dole – vertikální značka DIGITÁTA */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-10 rotate-90">
        <span className="text-[0.75rem] tracking-[0.35em] uppercase text-slate-300/80">
          DIGITÁTA
        </span>
      </div>
    </section>
  );
}