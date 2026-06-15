'use client';
import Hero from '@/components/Hero';
import SocialProofBar from '@/components/SocialProofBar';
import Marquee from '@/components/Marquee';
import TheProblem from '@/components/TheProblem';
import WhyMarketEducation from '@/components/WhyMarketEducation';
import MarketsCovered from '@/components/MarketsCovered';
import WhoIsThisFor from '@/components/WhoIsThisFor';
import Internships from '@/components/Internships';
import CareerOutcomes from '@/components/CareerOutcomes';
import AboutTrainer from '@/components/AboutTrainer';
import Community from '@/components/Community';
import Testimonials from '@/components/Testimonials';
import WorkshopOutcomes from '@/components/WorkshopOutcomes';
import Inquiry from '@/components/Inquiry';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import StickyEnrollBar from '@/components/StickyEnrollBar';

export default function Home() {
  return (
    <>
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Social Proof Bar */}
        <SocialProofBar />

        {/* Trust Booster: Partner/Exchange Logos */}
        <Marquee />

        {/* Section 3: The Problem */}
        <TheProblem />

        {/* Section 4: Why Financial Market Education Matters */}
        <WhyMarketEducation />

        {/* Section 6: Markets Covered */}
        <MarketsCovered />

        {/* Section 7: Who Is This For */}
        <WhoIsThisFor />

        {/* Section 9: Internship Opportunities */}
        <Internships />

        {/* Section 10: Career & Skill Outcomes */}
        <CareerOutcomes />

        {/* Section 11: Mentor (Experience, Research, Teaching) */}
        <AboutTrainer />

        {/* Section 12: Community (Screenshots & discussion) */}
        <Community />

        {/* Section 13: Testimonials (Video -> LinkedIn -> Student -> Written) */}
        <Testimonials />

        {/* Section 14: Workshop Outcomes (Webinar Blueprint) */}
        <WorkshopOutcomes />

        {/* Sections 15 & 16: Workshop Details & Registration Form */}
        <Inquiry />

        {/* Section 17: FAQ (8 targeted questions) */}
        <FAQ />

        {/* Section 18: Final CTA (Red backdrop section) */}
        <CTABanner />
      </main>

      {/* Conversion Boosters & Floating Elements */}
      <StickyEnrollBar />
      <FloatingWhatsApp />
      <ExitIntentPopup />
    </>
  );
}
