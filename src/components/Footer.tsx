import React, { useState } from 'react';
import { brandConfig } from '../config/brand';
import { Region } from '../types';

interface FooterProps {
  region: Region;
  onSelectRegion: (region: Region) => void;
}

export const Footer: React.FC<FooterProps> = ({ region, onSelectRegion }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#EDE6D8] border-t border-[#dfd6c5] text-[#1C1C1A] pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Large Serif Wordmark */}
        <div className="pb-12 border-b border-[#dfd6c5]/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1F3A34] tracking-tight">
              Hearth & Home
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#6B675E] font-medium mt-1">
              Thoughtful Domestic & Commercial Care · Est. {brandConfig.foundingYear}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-[#6B675E]">Active Territory:</span>
            <button
              type="button"
              onClick={() => onSelectRegion('US')}
              className={`px-2 py-1 rounded transition-colors ${
                region === 'US' ? 'bg-[#1F3A34] text-[#F6F2EA]' : 'text-[#1F3A34] hover:underline'
              }`}
            >
              United States
            </button>
            <span className="text-[#dfd6c5]">/</span>
            <button
              type="button"
              onClick={() => onSelectRegion('UK')}
              className={`px-2 py-1 rounded transition-colors ${
                region === 'UK' ? 'bg-[#1F3A34] text-[#F6F2EA]' : 'text-[#1F3A34] hover:underline'
              }`}
            >
              United Kingdom
            </button>
          </div>
        </div>

        {/* Middle Tier: Links & Newsletter */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-[#dfd6c5]/80">
          
          {/* Col 1: Disciplines */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1F3A34]">
              Disciplines
            </h3>
            <ul className="space-y-2 text-xs text-[#6B675E]">
              <li><a href="#services" className="hover:text-[#1F3A34] transition-colors">Regular Maintenance</a></li>
              <li><a href="#services" className="hover:text-[#1F3A34] transition-colors">Deep Seasonal Reset</a></li>
              <li><a href="#services" className="hover:text-[#1F3A34] transition-colors">Move-In / Move-Out</a></li>
              <li><a href="#services" className="hover:text-[#1F3A34] transition-colors">Studio & Workplace Care</a></li>
              <li><a href="#services" className="hover:text-[#1F3A34] transition-colors">Short-Stay Airbnb Turnover</a></li>
              <li><a href="#services" className="hover:text-[#1F3A34] transition-colors">Post-Construction Extraction</a></li>
            </ul>
          </div>

          {/* Col 2: Locations & Direct Contacts */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1F3A34]">
              Local Depots
            </h3>
            <div className="space-y-4 text-xs text-[#6B675E]">
              <div>
                <p className="font-semibold text-[#1C1C1A]">US Operations (Austin & Chicago):</p>
                <p>{brandConfig.contact.us.primaryAddress}</p>
                <p>
                  Direct:{' '}
                  <a href={`tel:${brandConfig.contact.us.phoneRaw}`} className="text-[#1F3A34] hover:underline">
                    {brandConfig.contact.us.phoneDisplay}
                  </a>
                </p>
              </div>

              <div>
                <p className="font-semibold text-[#1C1C1A]">UK Operations (London & Leeds):</p>
                <p>{brandConfig.contact.uk.primaryAddress}</p>
                <p>
                  Direct:{' '}
                  <a href={`tel:${brandConfig.contact.uk.phoneRaw}`} className="text-[#1F3A34] hover:underline">
                    {brandConfig.contact.uk.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Newsletter & Standards */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1F3A34]">
              The Hearth Journal
            </h3>
            <p className="text-xs text-[#6B675E] leading-relaxed">
              Quarterly dispatches on heirloom furniture preservation, natural stain lifting, and indoor air health. Zero sales spam.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#F6F2EA] rounded-md border border-[#dfd6c5] text-xs text-[#1F3A34]">
                ✓ Thank you. You are added to our quarterly home notes.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="Your personal email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-[#F6F2EA] border border-[#dfd6c5] rounded-md px-3 py-2 text-xs text-[#1C1C1A] placeholder:text-[#6B675E] focus:outline-none focus:ring-1 focus:ring-[#1F3A34] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#1F3A34] hover:bg-[#152723] text-[#F6F2EA] text-xs font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Join
                </button>
              </form>
            )}

            <div className="pt-4 text-[11px] text-[#6B675E] space-y-1">
              <p>Certified Real Living Wage Employer · 100% Direct Employment</p>
              <p>Commercial General Liability Policy #HH-99201-GL ($2M / £2M)</p>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Quiet Legal */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6B675E] gap-4">
          <p>© {new Date().getFullYear()} {brandConfig.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#faq" className="hover:text-[#1F3A34] transition-colors">Privacy Notice</a>
            <a href="#faq" className="hover:text-[#1F3A34] transition-colors">Terms of Service</a>
            <a href="#faq" className="hover:text-[#1F3A34] transition-colors">Insurance Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
