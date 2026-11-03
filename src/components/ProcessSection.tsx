import React from 'react';
import { brandConfig } from '../config/brand';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-[#F6F2EA] border-b border-[#EDE6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight text-balance">
            Three deliberate steps, <span className="italic font-normal text-[#C4623A]">zero</span> guessing.
          </h2>
          <p className="mt-3 text-sm text-[#6B675E]">
            We do not rush through your door with generic checklists. We learn your home’s specific boundaries first.
          </p>
        </div>

        {/* 3 Steps with Oversized Serif Numerals and Delicate Connecting Line */}
        <div className="relative">
          {/* Subtle connecting line across desktop */}
          <div
            className="hidden lg:block absolute top-12 left-8 right-8 h-[1px] bg-[#dfd6c5] z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-10 relative z-10">
            {brandConfig.process.map((step) => (
              <div key={step.number} className="flex flex-col items-start">
                
                {/* Large Serif Numeral */}
                <div className="font-serif text-5xl sm:text-6xl text-[#1F3A34] font-normal tracking-tighter mb-4 bg-[#F6F2EA] pr-4">
                  {step.number}
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F3A34] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-[#C4623A]">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-[#6B675E] leading-relaxed pt-2">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Callout Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-lg border border-[#EDE6D8] bg-[#EDE6D8]/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h4 className="font-serif text-lg sm:text-xl text-[#1F3A34]">
              The 24-Hour Reclean Promise
            </h4>
            <p className="text-xs sm:text-sm text-[#6B675E] mt-1 leading-relaxed">
              If any baseboard, oven interior, or bathroom tile was missed during your service, text us within 24 hours. Your team returns the next day to redo it freely with no awkward dispute.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] bg-[#F6F2EA] border border-[#dfd6c5] px-4 py-2 rounded">
              Signed Guarantee
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
