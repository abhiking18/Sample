import React from 'react';
import { brandConfig } from '../config/brand';
import { CleanerTeamMember } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

export const MeetTheTeam: React.FC = () => {
  return (
    <section id="team" className="py-20 lg:py-28 bg-[#F6F2EA] border-b border-[#EDE6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
            The Hands in Your Home
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight">
            Meet the actual people who <span className="italic font-normal text-[#C4623A]">hold your keys</span>.
          </h2>
          <p className="mt-3 text-sm text-[#6B675E]">
            We do not have a faceless contractor roster. Every cleaner is on our permanent payroll, bonded, and mentored in surface conservation.
          </p>
        </div>

        {/* 4 Cleaners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {brandConfig.team.map((member: CleanerTeamMember) => (
            <div
              key={member.id}
              className="flex flex-col bg-[#EDE6D8]/30 rounded-lg overflow-hidden border border-[#EDE6D8] transition-all duration-300 hover:border-[#1F3A34]/30"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={member.image}
                  alt={member.alt}
                  aspectRatioClass="aspect-[4/5]"
                  className="w-full object-cover filter contrast-[1.03]"
                />
                <div className="absolute bottom-3 left-3 bg-[#F6F2EA]/95 text-[#1F3A34] text-[11px] font-medium px-2 py-0.5 rounded border border-[#EDE6D8]">
                  {member.location}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#1F3A34] tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#C4623A] font-medium mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-[#6B675E] mt-0.5">
                    {member.tenure}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-[#dfd6c5] text-xs text-[#6B675E] leading-relaxed">
                    <span className="font-semibold text-[#1F3A34] block mb-1">Passionate detail:</span>
                    “{member.funFact}”
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Living Wage & Bonding Statement */}
        <div className="mt-14 p-6 sm:p-8 bg-[#EDE6D8]/60 rounded-lg border border-[#dfd6c5] grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div>
            <p className="font-serif text-base font-semibold text-[#1F3A34]">
              Living Wage Direct Employment
            </p>
            <p className="text-xs text-[#6B675E] mt-1 leading-relaxed">
              We pay 25% above living wage minimums with full healthcare subsidies and paid parental leave. Happy cleaners do exceptional work.
            </p>
          </div>

          <div>
            <p className="font-serif text-base font-semibold text-[#1F3A34]">
              Thorough Background Vetting
            </p>
            <p className="text-xs text-[#6B675E] mt-1 leading-relaxed">
              Enhanced DBS criminal checks in the UK, multi-jurisdiction criminal and reference vetting in the US.
            </p>
          </div>

          <div>
            <p className="font-serif text-base font-semibold text-[#1F3A34]">
              Surface Conservation Trained
            </p>
            <p className="text-xs text-[#6B675E] mt-1 leading-relaxed">
              Trained on Carrara marble, unlacquered brass, oiled walnut, lime plaster, and heritage ceramic restoration.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
