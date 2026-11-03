import React, { useState } from 'react';
import { brandConfig } from '../config/brand';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#EDE6D8]/30 border-b border-[#EDE6D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight">
            Common questions about <span className="italic font-normal text-[#C4623A]">how we work</span>.
          </h2>
          <p className="mt-2 text-sm text-[#6B675E]">
            Everything is straightforward. No small print, no unexpected cancellation gotchas.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3">
          {brandConfig.faqs.map((faq: FaqItem, index: number) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#F6F2EA] rounded-lg border border-[#EDE6D8] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4623A]"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#1F3A34] tracking-tight">
                    {faq.question}
                  </span>
                  <span className="text-[#1F3A34] shrink-0 text-xl font-light w-6 text-center">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm text-[#6B675E] leading-relaxed border-t border-[#EDE6D8]/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-[#6B675E]">
          Have a specific surface question or special heirloom concern?{' '}
          <a
            href="mailto:hello@hearthandhomeclean.com"
            className="text-[#1F3A34] underline underline-offset-4 font-medium"
          >
            Email our founder directly
          </a>
        </div>

      </div>
    </section>
  );
};
