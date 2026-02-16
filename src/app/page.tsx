import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Books from "./components/Books";
import Contact from "./components/Contact";
import MentoringModal from "./components/MentoringModal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Services />
        <div className="mt-10 flex justify-center">
          <MentoringModal />
        </div>
        <Books />
        <Contact />
      </main>
    </>
  );
}
