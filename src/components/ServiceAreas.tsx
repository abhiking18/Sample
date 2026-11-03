import React from 'react';
import { brandConfig } from '../config/brand';
import { Region } from '../types';

interface ServiceAreasProps {
  region: Region;
}

export const ServiceAreas: React.FC<ServiceAreasProps> = ({ region }) => {
  return (
    <section className="py-20 lg:py-24 bg-[#F6F2EA] border-b border-[#EDE6D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
            Coverage Map
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1F3A34] tracking-tight">
            Cities & neighborhoods we <span className="italic font-normal text-[#C4623A]">serve daily</span>.
          </h2>
          <p className="mt-2 text-sm text-[#6B675E]">
            We operate local depots with dedicated teams in each territory. No cross-city traffic delays.
          </p>
        </div>

        {/* Clean Editorial Text List (NO chips / pills as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-4 border-t border-[#EDE6D8]">
          
          {/* United States */}
          <div className={`space-y-6 ${region === 'US' ? 'opacity-100' : 'opacity-85'}`}>
            <div className="flex items-baseline justify-between border-b border-[#dfd6c5] pb-2">
              <h3 className="font-serif text-2xl text-[#1F3A34]">
                United States
              </h3>
              <span className="text-xs text-[#6B675E]">Central & Southern Depots</span>
            </div>

            <dl className="space-y-5">
              {brandConfig.serviceAreas.us.map((item) => (
                <div key={item.city} className="space-y-1">
                  <dt className="font-serif text-lg text-[#1F3A34] font-medium">
                    {item.city}
                  </dt>
                  <dd className="text-xs text-[#6B675E] leading-relaxed">
                    {item.neighborhoods}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* United Kingdom */}
          <div className={`space-y-6 ${region === 'UK' ? 'opacity-100' : 'opacity-85'}`}>
            <div className="flex items-baseline justify-between border-b border-[#dfd6c5] pb-2">
              <h3 className="font-serif text-2xl text-[#1F3A34]">
                United Kingdom
              </h3>
              <span className="text-xs text-[#6B675E]">Greater London & The North</span>
            </div>

            <dl className="space-y-5">
              {brandConfig.serviceAreas.uk.map((item) => (
                <div key={item.city} className="space-y-1">
                  <dt className="font-serif text-lg text-[#1F3A34] font-medium">
                    {item.city}
                  </dt>
                  <dd className="text-xs text-[#6B675E] leading-relaxed">
                    {item.neighborhoods}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[#EDE6D8] text-xs text-[#6B675E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p>
            Do not see your postal code? We regularly take on bespoke residential estates within 25 miles of these hubs.
          </p>
          <a
            href="#book"
            className="text-[#1F3A34] font-medium hover:underline underline-offset-4 whitespace-nowrap"
          >
            Inquire about out-of-boundary service →
          </a>
        </div>

      </div>
    </section>
  );
};
