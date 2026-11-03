import React from 'react';
import { motion } from 'motion/react';
import { Region } from '../types';
import { brandConfig } from '../config/brand';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  region: Region;
  onOpenCalculator: () => void;
  onScrollToTeam: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  region,
  onOpenCalculator,
  onScrollToTeam,
}) => {
  const isUS = region === 'US';

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 pb-16 lg:pb-24 bg-[#F6F2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Subtle editorial kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-widest text-[#6B675E] font-medium mb-4 flex items-center gap-2"
            >
              <span>Bonded & Insured</span>
              <span aria-hidden="true" className="text-[#C4623A]">/</span>
              <span>{isUS ? 'Austin & Chicago' : 'London & Leeds'}</span>
              <span aria-hidden="true" className="text-[#C4623A]">/</span>
              <span>Living Wage Certified</span>
            </motion.div>

            {/* Main Headline: Large Serif with exactly one italic word */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1F3A34] tracking-tight leading-[1.08] max-w-2xl text-balance"
            >
              Homes cared for with quiet <span className="italic font-normal text-[#C4623A]">precision</span>, not rush.
            </motion.h1>

            {/* Short, specific human copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg text-[#6B675E] leading-relaxed max-w-xl"
            >
              Same two cleaners every visit. You will know their names. We use natural botanical extracts that leave surfaces matte and your rooms smelling of cedar, not harsh chlorine.
            </motion.p>

            {/* Two buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[#F6F2EA] bg-[#C4623A] hover:bg-[#b0532e] rounded-md transition-all duration-200 active:scale-[0.99] shadow-xs text-center"
              >
                Calculate your instant quote
              </button>

              <button
                type="button"
                onClick={onScrollToTeam}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[#1F3A34] bg-transparent hover:bg-[#1F3A34] hover:text-[#F6F2EA] border border-[#1F3A34] rounded-md transition-all duration-200 text-center"
              >
                Meet our cleaners
              </button>
            </motion.div>

            {/* Honest rating line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-[#EDE6D8] w-full max-w-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6B675E]"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-semibold text-[#1F3A34]">
                  {brandConfig.stats.averageRating} / 5.0
                </span>
                <span className="text-[#1F3A34]">★★★★★</span>
              </div>
              <p>
                Based on verified feedback across {brandConfig.stats.totalHomesCleaned} homes in {isUS ? 'Austin, Chicago & Dallas' : 'London, Leeds & Manchester'}.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Layered Editorial Photography */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Primary tall photograph */}
              <div className="rounded-lg overflow-hidden border border-[#EDE6D8] shadow-sm bg-[#EDE6D8]">
                <ImageWithFallback
                  src={brandConfig.images.heroMain}
                  alt="Tranquil sunlit living room with natural oak flooring"
                  aspectRatioClass="aspect-[4/5]"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Smaller overlapping detail photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-56 rounded-md overflow-hidden border-2 border-[#F6F2EA] shadow-md bg-[#EDE6D8]"
              >
                <ImageWithFallback
                  src={brandConfig.images.heroDetail}
                  alt="Hands wiping stone counter with natural cotton cloth and amber spray bottle"
                  aspectRatioClass="aspect-square"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Subtle flat trust card */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#F6F2EA] border border-[#dfd6c5] rounded-md px-3.5 py-2.5 shadow-xs text-left max-w-[200px]">
                <p className="text-[11px] font-semibold text-[#1F3A34] uppercase tracking-wider">
                  Guaranteed Pair
                </p>
                <p className="text-xs text-[#6B675E] mt-0.5 leading-snug">
                  Zero rotating temps. Always the two people you trust.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
