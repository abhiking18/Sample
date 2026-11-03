import React, { useState } from 'react';
import { Region } from './types';
import { brandConfig } from './config/brand';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { IntroManifesto } from './components/IntroManifesto';
import { ServicesGrid } from './components/ServicesGrid';
import { QuoteCalculator } from './components/QuoteCalculator';
import { ProcessSection } from './components/ProcessSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { PricingSection } from './components/PricingSection';
import { ReviewsCarousel } from './components/ReviewsCarousel';
import { MeetTheTeam } from './components/MeetTheTeam';
import { ServiceAreas } from './components/ServiceAreas';
import { FaqSection } from './components/FaqSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [region, setRegion] = useState<Region>('US');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    brandConfig.services[0].id
  );

  const [activeQuoteData, setActiveQuoteData] = useState<{
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    frequency: string;
    propertyType: string;
    addons: string[];
    totalPrice: number;
    currency: string;
    estimatedHours: number;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromGrid = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection('calculator');
  };

  const handleProceedToBookingFromCalculator = (quoteData: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    frequency: string;
    propertyType: string;
    addons: string[];
    totalPrice: number;
    currency: string;
    estimatedHours: number;
  }) => {
    setActiveQuoteData(quoteData);
    scrollToSection('book');
  };

  const handleSelectPlanFromPricing = (planName: string) => {
    // If standard plan selected, map to regular service
    scrollToSection('book');
  };

  return (
    <div className="min-h-screen bg-[#F6F2EA] text-[#1C1C1A] font-sans antialiased selection:bg-[#C4623A]/20 selection:text-[#1F3A34]">
      {/* 1. Solid Top Navigation Bar */}
      <Navbar
        region={region}
        onToggleRegion={(newRegion) => setRegion(newRegion)}
        onOpenBooking={() => scrollToSection('book')}
      />

      <main>
        {/* 2. Hero Section: Split Asymmetric Layout with Layered Photos */}
        <Hero
          region={region}
          onOpenCalculator={() => scrollToSection('calculator')}
          onScrollToTeam={() => scrollToSection('team')}
        />

        {/* Marquee Strip in Serif Typography */}
        <MarqueeStrip />

        {/* 3. Short Intro Manifesto Paragraph in Big Serif */}
        <IntroManifesto region={region} />

        {/* 4. Services: Asymmetric Image-Led Grid */}
        <ServicesGrid
          region={region}
          onSelectServiceForQuote={handleSelectServiceFromGrid}
        />

        {/* 5. Instant Quote Calculator */}
        <QuoteCalculator
          region={region}
          selectedServiceId={selectedServiceId}
          onServiceChange={(id) => setSelectedServiceId(id)}
          onProceedToBooking={handleProceedToBookingFromCalculator}
        />

        {/* 6. Our Process: 3 Numbered Steps with Connecting Line */}
        <ProcessSection />

        {/* 7. Before / After Draggable Split-Screen Slider */}
        <BeforeAfterSlider />

        {/* 8. Pricing: 3 Clean Plans with Frequency Toggle */}
        <PricingSection
          region={region}
          onSelectPlan={handleSelectPlanFromPricing}
        />

        {/* 9. Reviews: Swipeable Carousel */}
        <ReviewsCarousel region={region} />

        {/* 10. Meet the Team: 4 Candid Cleaners */}
        <MeetTheTeam />

        {/* 11. Service Areas: Simple Text List */}
        <ServiceAreas region={region} />

        {/* 12. FAQ Accordion: 6 Real Questions */}
        <FaqSection />

        {/* 13. Booking Form with Validation & Calm Success State */}
        <BookingSection
          region={region}
          initialQuoteData={activeQuoteData}
        />
      </main>

      {/* 14. Footer with Large Serif Wordmark */}
      <Footer
        region={region}
        onSelectRegion={(newRegion) => setRegion(newRegion)}
      />

      {/* Extras: Thin Scroll Progress, WhatsApp/Call Helper, Mobile Sticky CTA */}
      <FloatingActions
        region={region}
        onOpenBooking={() => scrollToSection('book')}
      />
    </div>
  );
}
