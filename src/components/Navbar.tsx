import React, { useState } from 'react';
import { Region } from '../types';
import { brandConfig } from '../config/brand';

interface NavbarProps {
  region: Region;
  onToggleRegion: (region: Region) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  region,
  onToggleRegion,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentContact = region === 'US' ? brandConfig.contact.us : brandConfig.contact.uk;

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Our Process', href: '#process' },
    { label: 'Instant Quote', href: '#calculator' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F2EA] border-b border-[#EDE6D8] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="text-2xl sm:text-2xl font-serif tracking-tight text-[#1F3A34] hover:text-[#152723] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Hearth & Home</span>
          <span className="text-xs font-sans tracking-widest uppercase text-[#6B675E] hidden sm:inline-block">
            Cleaning Co.
          </span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#1C1C1A]/80"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#1F3A34] transition-colors hover:underline underline-offset-8 decoration-[#C4623A] decoration-1 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Region Toggle & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* US / UK Country Switcher */}
          <div
            role="group"
            aria-label="Select Country"
            className="flex items-center bg-[#EDE6D8] rounded-md p-0.5 border border-[#dfd6c5] text-xs font-medium"
          >
            <button
              type="button"
              onClick={() => onToggleRegion('US')}
              className={`px-2.5 py-1 rounded transition-colors ${
                region === 'US'
                  ? 'bg-[#1F3A34] text-[#F6F2EA]'
                  : 'text-[#6B675E] hover:text-[#1C1C1A]'
              }`}
              title="US locations (Austin, Chicago, Dallas)"
            >
              US ($)
            </button>
            <button
              type="button"
              onClick={() => onToggleRegion('UK')}
              className={`px-2.5 py-1 rounded transition-colors ${
                region === 'UK'
                  ? 'bg-[#1F3A34] text-[#F6F2EA]'
                  : 'text-[#6B675E] hover:text-[#1C1C1A]'
              }`}
              title="UK locations (London, Leeds, Manchester, Edinburgh)"
            >
              UK (£)
            </button>
          </div>

          {/* Desktop Phone Quick Link */}
          <a
            href={`tel:${currentContact.phoneRaw}`}
            className="hidden lg:inline-flex text-xs text-[#6B675E] hover:text-[#1F3A34] transition-colors whitespace-nowrap"
          >
            {currentContact.phoneDisplay}
          </a>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#F6F2EA] bg-[#C4623A] hover:bg-[#b0532e] active:scale-[0.99] rounded-md transition-all shadow-xs whitespace-nowrap"
          >
            Get a quote
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-[#1F3A34] hover:bg-[#EDE6D8] rounded-md transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EDE6D8] bg-[#F6F2EA] px-6 pt-5 pb-8 space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE6D8]">
            <span className="text-xs uppercase tracking-wider text-[#6B675E]">Active Region</span>
            <div className="flex items-center bg-[#EDE6D8] rounded-md p-0.5 border border-[#dfd6c5] text-xs">
              <button
                type="button"
                onClick={() => onToggleRegion('US')}
                className={`px-3 py-1 rounded font-medium ${
                  region === 'US' ? 'bg-[#1F3A34] text-[#F6F2EA]' : 'text-[#6B675E]'
                }`}
              >
                United States ($)
              </button>
              <button
                type="button"
                onClick={() => onToggleRegion('UK')}
                className={`px-3 py-1 rounded font-medium ${
                  region === 'UK' ? 'bg-[#1F3A34] text-[#F6F2EA]' : 'text-[#6B675E]'
                }`}
              >
                United Kingdom (£)
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-3.5 text-base font-medium text-[#1C1C1A]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-1 hover:text-[#C4623A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#EDE6D8] space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-sm font-medium text-[#F6F2EA] bg-[#C4623A] hover:bg-[#b0532e] rounded-md transition-colors"
            >
              Calculate your quote
            </button>
            <div className="flex items-center justify-between text-xs text-[#6B675E] pt-1">
              <span>Direct call:</span>
              <a
                href={`tel:${currentContact.phoneRaw}`}
                className="font-medium text-[#1F3A34] hover:underline"
              >
                {currentContact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
