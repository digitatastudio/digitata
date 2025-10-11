// src/app/components/About.tsx
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Text vlevo */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
            O mně <span style={{ color: "#002D62" }}>DIGITÁTA</span>
          </h2>

          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Jsem Míra, táta, který si prošel těžkým obdobím po rozchodu a
              hledal cestu, jak si udržet vztah se svou dcerou i sám se sebou.
              Díky tomu dnes vím, že i po pádu může přijít nový začátek.
            </p>
            <p>
              Projekt DIGITÁTA jsem založil proto, abych ukázal dalším rodičům,
              že autenticita, disciplína a láska k dětem dokážou změnit život.
            </p>
            <p>
              Proto vznikl projekt{" "}
              <span className="font-bold" style={{ color: "#002D62" }}>
                DIGITÁTA
              </span>{" "}
              – místo, kde najdeš podporu, inspiraci a praktické tipy.
            </p>
          </div>
        </div>

        {/* Fotka vpravo */}
        <div className="relative mx-auto w-full max-w-[520px] aspect-[4/3]">
          <Image
            src="/mira.jpg" // fotka v /public
            alt="Miroslav — autor projektu DIGITÁTA"
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, 520px"
            className="rounded-xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
