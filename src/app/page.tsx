
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Books from "./components/Books";
import Cta from "./components/Cta";
import Contact from "./components/Contact"; // ← Tohle přidej

export default function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Services />
        <Books />
        <Cta />
        <Contact /> {/* ← A TADY to musí být */}
      </main>
    </>
  );
}
