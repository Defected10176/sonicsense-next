import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UseCases from "@/components/UseCases";
import HowItWorks from "@/components/HowItWorks";
import Demo from "@/components/Demo";
import Sounds from "@/components/Sounds";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="divider" />
      <UseCases />
      <div className="divider" />
      <HowItWorks />
      <div className="divider" />
      <Demo />
      <div className="divider" />
      <Sounds />
      <Footer />
    </main>
  );
}
