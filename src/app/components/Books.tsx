// src/app/components/Books.tsx
"use client";

import Image from "next/image";
type Book = {
  image: string;
  title: string;
  blurb: string;
  variant: "free" | "buy";
  imageLeft?: boolean;
};

function BookRow({ book }: { book: Book }) {
  const btnClass =
    "bg-[#002D62] hover:bg-[#001a3d] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300";

  return (
    <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      {/* Obrázek */}
      <div className={book.imageLeft ? "order-1" : "order-1 md:order-2"}>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-72 object-cover rounded-2xl shadow-md"
        />
      </div>

      {/* Text */}
      <div className={book.imageLeft ? "order-2" : "order-2 md:order-1"}>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#002D62]">
          {book.title}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-5">{book.blurb}</p>
        <button
          disabled
          title="Brzy dostupné"
          className={btnClass}
        >
          {book.variant === "free"
            ? "Stáhnout zdarma (brzy)"
            : "Koupit (brzy)"}
        </button>
      </div>
    </article>
  );
}

export default function Books() {
  const books: Book[] = [
    {
      image: "/emocnirestart.jpg",
      title: "Emoční restart: 7 dní k sobě",
      blurb:
        "Krátký program pro rodiče po těžkých chvílích. 7 dní, jasné mini-úkoly a návrat k vnitřnímu klidu.",
      variant: "free",
      imageLeft: true,
    },
    {
      image: "/tatanafurt.jpg",
      title: "Táta na furt",
      blurb:
        "Praktický průvodce pro tátu po rozchodu. Ego dolů, respekt nahoru. Jak udržet klid a vztah s dítětem.",
      variant: "buy",
      imageLeft: false,
    },
  ];

  return (
    <section id="books" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight text-[#002D62]">
          Moje knihy & e-booky
        </h2>
        <div className="space-y-12">
          {books.map((b) => (
            <BookRow key={b.title} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
