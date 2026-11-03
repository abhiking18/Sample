import React, { useState } from 'react';
import { Region } from '../types';
import { brandConfig } from '../config/brand';

interface PricingSectionProps {
  region: Region;
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  region,
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'recurring' | 'onetime'>('recurring');
  const currencySymbol = region === 'US' ? '$' : '£';

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#F6F2EA] border-b border-[#EDE6D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
              Fixed Schedule Rates
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight">
              Honest tiers, <span className="italic font-normal text-[#C4623A]">no surprises</span>.
            </h2>
          </div>

          {/* Monthly / One-Time Frequency Toggle */}
          <div className="flex items-center bg-[#EDE6D8] p-1 rounded-md border border-[#dfd6c5] self-start md:self-auto text-xs font-medium">
            <button
              type="button"
              onClick={() => setBillingCycle('recurring')}
              className={`px-3.5 py-1.5 rounded transition-all ${
                billingCycle === 'recurring'
                  ? 'bg-[#1F3A34] text-[#F6F2EA] shadow-xs'
                  : 'text-[#6B675E] hover:text-[#1C1C1A]'
              }`}
            >
              Fortnightly / Weekly (Save 15%)
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('onetime')}
              className={`px-3.5 py-1.5 rounded transition-all ${
                billingCycle === 'onetime'
                  ? 'bg-[#1F3A34] text-[#F6F2EA] shadow-xs'
                  : 'text-[#6B675E] hover:text-[#1C1C1A]'
              }`}
            >
              One-Time Single Visit
            </button>
          </div>
        </div>

        {/* 3 Plans Clean Table-like Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {brandConfig.pricingPlans.map((plan) => {
            const price =
              region === 'US'
                ? billingCycle === 'recurring'
                  ? plan.priceUS.recurring
                  : plan.priceUS.onetime
                : billingCycle === 'recurring'
                ? plan.priceUK.recurring
                : plan.priceUK.onetime;

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-lg bg-[#F6F2EA] p-7 sm:p-8 transition-all ${
                  plan.isPopular
                    ? 'border-2 border-[#C4623A] shadow-sm relative'
                    : 'border border-[#EDE6D8]'
                }`}
              >
                {/* Subtle text kicker for highlighted plan (no neon badge) */}
                {plan.isPopular && (
                  <div className="text-[11px] uppercase tracking-wider text-[#C4623A] font-semibold mb-2">
                    Recommended Routine
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-2xl text-[#1F3A34] tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B675E] min-h-[32px]">
                    {plan.subtitle}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#EDE6D8]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-semibold text-[#1F3A34] tabular-nums">
                        {currencySymbol}{price}
                      </span>
                      <span className="text-xs text-[#6B675E]">
                        / {billingCycle === 'recurring' ? 'visit' : 'single visit'}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#6B675E]">
                      {plan.idealFor}
                    </p>
                  </div>

                  {/* Feature Checklist Table */}
                  <div className="mt-8 pt-6 border-t border-[#EDE6D8] space-y-3">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1F3A34] block mb-2">
                      Scope of Care
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2.5 text-xs ${
                          feature.included ? 'text-[#1C1C1A]' : 'text-[#6B675E]/60 line-through'
                        }`}
                      >
                        <span
                          className={`mt-0.5 font-bold ${
                            feature.included ? 'text-[#1F3A34]' : 'text-[#6B675E]/40'
                          }`}
                        >
                          {feature.included ? '✓' : '—'}
                        </span>
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EDE6D8]">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3 px-4 text-xs font-medium rounded-md transition-all text-center ${
                      plan.isPopular
                        ? 'bg-[#C4623A] text-[#F6F2EA] hover:bg-[#b0532e]'
                        : 'bg-transparent text-[#1F3A34] border border-[#1F3A34] hover:bg-[#1F3A34] hover:text-[#F6F2EA]'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-[#6B675E]">
          Need an estate walkthrough or custom commercial contract?{' '}
          <a href="#book" className="text-[#1F3A34] underline underline-offset-4 font-medium">
            Request an in-person assessment
          </a>
        </p>

      </div>
    </section>
  );
};
