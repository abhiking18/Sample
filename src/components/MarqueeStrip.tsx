import React from 'react';

const serviceKeywords = [
  'Regular Maintenance',
  'Deep Seasonal Resets',
  'Move-In Turnarounds',
  'Studio & Office Sanitation',
  'Short-Stay Turnovers',
  'Post-Plaster Dust Extraction',
  'Plant-Based Formulas',
  'Sealed HEPA Filtration',
  'Dedicated Pair of Cleaners',
];

export const MarqueeStrip: React.FC = () => {
  return (
    <div className="relative py-4 border-y border-[#EDE6D8] bg-[#EDE6D8]/50 overflow-hidden select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...serviceKeywords, ...serviceKeywords].map((item, index) => (
          <span key={index} className="inline-flex items-center text-sm sm:text-base font-serif text-[#1F3A34]/80 mx-5 sm:mx-8">
            <span>{item}</span>
            <span className="ml-5 sm:ml-8 text-[#C4623A] text-xs" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
