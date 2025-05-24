import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Features } from "@/components/Features/Features";
import { Calculator } from "@/components/Calculator/Calculator";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Calculator />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
