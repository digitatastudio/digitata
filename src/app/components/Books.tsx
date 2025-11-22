// src/app/components/Books.tsx

type Book = {
  image: string;
  title: string;
  blurb: string;
  variant: "free" | "paid";
};

function BookRow({ book }: { book: Book }) {
  const btnClass =
    "mt-4 inline-block rounded-lg bg-[#002D62] px-6 py-3 text-sm font-semibold text-white opacity-70 cursor-not-allowed";

  return (
    <article className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
      <img
        src={book.image}
        alt={book.title}
        className="w-64 h-auto rounded-xl shadow-lg"
      />

      <div>
        <h3 className="mb-2 text-xl font-bold text-[#002D62]">{book.title}</h3>
        <p className="mb-4 text-base text-slate-700">{book.blurb}</p>

        <button disabled className={btnClass} title="Brzy dostupné">
          {book.variant === "free" ? "Stáhnout zdarma (brzy)" : "Koupit (brzy)"}
        </button>
      </div>
    </article>
  );
}

export default function Books() {
  const books: Book[] = [
    {
      image: "/emo_restart.jpg",
      title: "Emoční restart: 7 dní k sobě",
      blurb:
        "Krátký program pro rodiče po těžkých chvílích. 7 dní, jasné mini-úkoly a návrat k vnitřnímu klidu.",
      variant: "free",
    },
    // další knížky klidně doplníš později
  ];

  return (
    <section id="books" className="bg-slate-50 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4">
        {books.map((book) => (
          <BookRow key={book.title} book={book} />
        ))}
      </div>
    </section>
  );
}
