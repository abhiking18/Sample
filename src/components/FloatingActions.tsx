import React, { useState, useEffect } from 'react';
import { Region } from '../types';
import { brandConfig } from '../config/brand';

interface FloatingActionsProps {
  region: Region;
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  region,
  onOpenBooking,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const currentContact = region === 'US' ? brandConfig.contact.us : brandConfig.contact.uk;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      // Show mobile sticky bar after scrolling past hero (~350px)
      setShowStickyBar(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Thin Scroll Progress Line at top of viewport */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#C4623A] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating WhatsApp / Call Button (discreet, bottom-right) */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-2">
        <a
          href={brandConfig.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with our coordinator on WhatsApp"
          className="flex items-center gap-2 bg-[#1F3A34] text-[#F6F2EA] hover:bg-[#152723] active:scale-95 transition-all px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full shadow-md text-xs font-medium border border-[#EDE6D8]/30"
        >
          <svg className="w-4 h-4 text-[#A9B8A0]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-.941-.055-.494-.175-1.144-.457-1.977-1.285-.929-.924-1.385-1.874-1.603-2.316-.217-.442-.023-.68.172-.876.176-.176.388-.456.582-.684.145-.171.193-.29.29-.485.097-.194.048-.363-.024-.508-.073-.145-.654-1.576-.897-2.16-.237-.569-.479-.492-.656-.501l-.56-.008c-.194 0-.509.073-.776.363-.267.29-1.02 1-1.02 2.435 0 1.436 1.045 2.822 1.191 3.016.145.194 2.059 3.144 4.988 4.407.697.301 1.241.481 1.666.616.7.222 1.338.191 1.842.115.562-.084 1.728-.707 1.971-1.388.243-.681.243-1.265.17-1.388-.072-.123-.266-.194-.557-.339z" />
          </svg>
          <span className="hidden sm:inline">Ask coordinator</span>
        </a>
      </div>

      {/* 3. Mobile Sticky "Book Now" Bar (strict <= 15% viewport height cap, mobile-only) */}
      {showStickyBar && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F6F2EA] border-t border-[#dfd6c5] px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 h-14">
          <div>
            <div className="font-serif text-sm font-semibold text-[#1F3A34] leading-tight">
              {brandConfig.shortName}
            </div>
            <div className="text-[10px] text-[#6B675E] leading-none mt-0.5">
              Same 2 cleaners · From {region === 'US' ? '$140' : '£115'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${currentContact.phoneRaw}`}
              aria-label="Call directly"
              className="px-3 py-1.5 text-xs text-[#1F3A34] border border-[#1F3A34] rounded-md font-medium"
            >
              Call
            </a>
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 text-xs font-medium text-[#F6F2EA] bg-[#C4623A] hover:bg-[#b0532e] rounded-md shadow-xs whitespace-nowrap"
            >
              Book now
            </button>
          </div>
        </div>
      )}
    </>
  );
};
