// src/app/components/Books.tsx

import Image from "next/image";

type Book = {
  image: string;
  title: string;
  blurb: string;
  variant: "free" | "paid";
};

const books: Book[] = [
  {
    image: "/emocnirestart.jpg",
    title: "Emoční restart: 7 dní k sobě",
    blurb:
      "Krátký program pro rodiče po těžkých chvílích. 7 dní, jasné mini-úkoly a návrat k vnitřnímu klidu.",
    variant: "free",
  },
];

export default function Books() {
  return (
    <section id="books" className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Moje knihy & e-booky
        </h2>

        <div className="grid gap-10">
          {books.map((book) => (
            <article
              key={book.title}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="w-full md:w-1/2">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
              </div>

              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-3">{book.title}</h3>
                <p className="text-gray-700 mb-4">{book.blurb}</p>

                <button
                  disabled
                  title="Brzy dostupné"
                  className="inline-flex items-center rounded-full bg-[#002D62] px-6 py-2 text-sm font-semibold text-white opacity-60 cursor-not-allowed"
                >
                  {book.variant === "free"
                    ? "Stáhnout zdarma (brzy)"
                    : "Koupit (brzy)"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
