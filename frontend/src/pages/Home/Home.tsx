import Navbar from "../../components/navigation/Navbar";
import Hero from "../../components/sections/Hero";
import SelectedWork from "../../components/sections/SelectedWork";
import Services from "../../components/sections/Services";
import Process from "../../components/sections/Process";
import About from "../../components/sections/About";
import Contact from "../../components/sections/Contact";
import Footer from "../../components/layout/Footer";
import { usePageAnimations } from "../../hooks/usePageAnimations";

function Home() {
  usePageAnimations();

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5]">
      <Navbar />

      <main>
        <Hero />

        <SelectedWork />

        <Services />

        <Process />

        <About />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default Home;