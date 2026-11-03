import React from 'react';
import { motion } from 'motion/react';
import { Region } from '../types';

interface IntroManifestoProps {
  region: Region;
}

export const IntroManifesto: React.FC<IntroManifestoProps> = ({ region }) => {
  const isUS = region === 'US';

  return (
    <section className="py-20 lg:py-28 bg-[#F6F2EA] border-b border-[#EDE6D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-xs uppercase tracking-widest text-[#6B675E] font-medium mb-6">
          The Hearth & Home Standard
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1F3A34] leading-[1.3] tracking-tight"
        >
          Most agencies treat houses like assembly lines—dispatching whoever has an open slot on their app that morning.{' '}
          <span className="italic text-[#C4623A]">We do the deliberate opposite.</span>{' '}
          We assign the same two bonded cleaners who remember{' '}
          <span className="border-b border-[#C4623A]/40 pb-0.5 text-[#1C1C1A]">which heirloom rug cannot take friction</span>,{' '}
          how your dog likes to be greeted at the door, and{' '}
          <span className="border-b border-[#C4623A]/40 pb-0.5 text-[#1C1C1A]">where the guest linen belongs</span>.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[#EDE6D8]">
          <div>
            <p className="font-serif text-2xl font-semibold text-[#1F3A34]">100% Direct Staff</p>
            <p className="mt-1 text-xs text-[#6B675E] leading-relaxed">
              No gig subcontractors. Every cleaner is on our payroll with paid holiday, pension, and wages 25% above living standards.
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl font-semibold text-[#1F3A34]">Zero Harsh Chemicals</p>
            <p className="mt-1 text-xs text-[#6B675E] leading-relaxed">
              Biodegradable plant formulations, cold-pressed citrus, and cedarwood oils. Safe for crawling infants, cats, and marble.
            </p>
          </div>

          <div>
            <p className="font-serif text-2xl font-semibold text-[#1F3A34]">{isUS ? '$2,000,000' : '£2,000,000'}</p>
            <p className="mt-1 text-xs text-[#6B675E] leading-relaxed">
              Full commercial liability and bonding on every visit. Rare accidents are solved same-day without finger-pointing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
