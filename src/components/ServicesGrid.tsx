import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Region, ServiceItem } from '../types';
import { brandConfig } from '../config/brand';
import { ImageWithFallback } from './ImageWithFallback';

interface ServicesGridProps {
  region: Region;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  region,
  onSelectServiceForQuote,
}) => {
  const [activeExpandedId, setActiveExpandedId] = useState<string | null>(null);
  const currencySymbol = region === 'US' ? '$' : '£';

  const toggleExpand = (id: string) => {
    setActiveExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#EDE6D8]/40 border-b border-[#EDE6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
              Our Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight text-balance">
              Six ways we restore calm to your <span className="italic font-normal text-[#C4623A]">spaces</span>.
            </h2>
          </div>
          <p className="text-sm text-[#6B675E] max-w-sm">
            Every booking is handled by a bonded two-person crew. No shortcuts, no rotating temps.
          </p>
        </div>

        {/* Asymmetric Image-Led Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {brandConfig.services.map((service: ServiceItem) => {
            const isExpanded = activeExpandedId === service.id;
            const price = region === 'US' ? service.priceUS : service.priceUK;

            return (
              <div
                key={service.id}
                className={`group relative bg-[#F6F2EA] rounded-lg border border-[#EDE6D8] overflow-hidden transition-all duration-300 hover:border-[#1F3A34]/30 ${
                  service.colSpan || ''
                }`}
              >
                {/* Image Container with Natural Framing */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.alt}
                    aspectRatioClass={service.colSpan ? 'aspect-[16/9]' : 'aspect-[4/3]'}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3.5 right-3.5 bg-[#F6F2EA]/95 border border-[#EDE6D8] px-3 py-1 rounded text-xs font-medium text-[#1F3A34] shadow-xs">
                    From {currencySymbol}{price} / {service.unit}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#1F3A34] tracking-tight">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#C4623A]">
                      {service.tagline}
                    </p>
                    <p className="mt-3 text-sm text-[#6B675E] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Expandable Checklist Details */}
                  <div className="mt-5 pt-4 border-t border-[#EDE6D8]">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleExpand(service.id)}
                        className="text-xs font-medium text-[#1F3A34] hover:text-[#C4623A] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{isExpanded ? 'Hide included checklist' : 'View included checklist'}</span>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectServiceForQuote(service.id)}
                        className="text-xs font-medium text-[#C4623A] hover:underline underline-offset-4"
                      >
                        Quote this service →
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-3.5 space-y-2 text-xs text-[#6B675E] bg-[#EDE6D8]/40 p-3.5 rounded-md border border-[#dfd6c5]">
                            {service.checklist.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#1F3A34] font-bold mt-0.5" aria-hidden="true">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
