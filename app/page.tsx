import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import LearningJourney from '@/components/LearningJourney';
import Certification from '@/components/Certification';
import AboutProgram from '@/components/AboutProgram';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Roadmap from '@/components/Roadmap';
import AboutTrainer from '@/components/AboutTrainer';
import FAQ from '@/components/FAQ';
import Inquiry from '@/components/Inquiry';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutProgram />
        <Marquee />
        <LearningJourney />
        <Certification />
        <Testimonials />
        <Roadmap />
        <AboutTrainer />
        <Pricing />
        <FAQ />
        <Inquiry />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
