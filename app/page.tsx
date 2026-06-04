import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import LearningJourney from '@/components/LearningJourney';
import Certification from '@/components/Certification';
import AboutProgram from '@/components/AboutProgram';
import Programs from '@/components/Programs';
import Curriculum from '@/components/Curriculum';
import Testimonials from '@/components/Testimonials';
import Roadmap from '@/components/Roadmap';
import AboutTrainer from '@/components/AboutTrainer';
import Community from '@/components/Community';
import FAQ from '@/components/FAQ';
import Inquiry from '@/components/Inquiry';
import CTABanner from '@/components/CTABanner';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import StickyEnrollBar from '@/components/StickyEnrollBar';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <AboutProgram />
        <Marquee />
        <LearningJourney />
        <Programs />
        <Curriculum />
        <Certification />
        <Testimonials />
        <Roadmap />
        <AboutTrainer />
        <Community />
        <FAQ />
        <Inquiry />
        <CTABanner />
      </main>

      {/* Conversion & Floating Elements */}
      <StickyEnrollBar />
      <FloatingWhatsApp />
      <ExitIntentPopup />
    </>
  );
}

