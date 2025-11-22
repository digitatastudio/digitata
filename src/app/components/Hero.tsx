// src/app/components/Hero.tsx
// import Image from "next/image";  ← TOHLE SMAŽ

export default function Hero() {
  return (
    <section
      className="
        relative h-screen flex items-center justify-center text-center text-white
        bg-gradient-to-b from-[#052b6b] to-[#001733]
      "
    >
      {/* lehký tmavý overlay, ať text víc svítí */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
          DIGITÁTA
        </h1>

        <p className="text-2xl md:text-3xl font-bold mb-6">
          Všechno začíná u <span className="text-[#4fa3ff]">tebe</span>.<br />
          Ty jsi <span className="text-[#4fa3ff]">úspěch</span>.
        </p>

        <p className="text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          Mentoring, inspirace a nástroje pro rodiče, kteří chtějí růst a
          budovat lepší život pro sebe i své děti.
        </p>

        <button
          className="
            inline-block rounded-xl font-bold py-3 px-10
            bg-[#004aad] hover:bg-[#005fe0]
            transition-transform hover:scale-105
            shadow-lg
          "
          onClick={() => {
            const el = document.querySelector("#about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Začni teď
        </button>
      </div>
    </section>
  );
}
