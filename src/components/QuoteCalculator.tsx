import React, { useState } from 'react';
import { Region } from '../types';
import { brandConfig } from '../config/brand';

interface QuoteCalculatorProps {
  region: Region;
  selectedServiceId: string;
  onServiceChange: (serviceId: string) => void;
  onProceedToBooking: (quoteData: {
    serviceId: string;
    bedrooms: number;
    bathrooms: number;
    frequency: string;
    propertyType: string;
    addons: string[];
    totalPrice: number;
    currency: string;
    estimatedHours: number;
  }) => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  region,
  selectedServiceId,
  onServiceChange,
  onProceedToBooking,
}) => {
  const isUS = region === 'US';
  const currencySymbol = isUS ? '$' : '£';
  const unitLabel = isUS ? brandConfig.contact.us.unitLabel : brandConfig.contact.uk.unitLabel;

  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [propertyType, setPropertyType] = useState<string>('apartment');
  const [frequency, setFrequency] = useState<string>('biweekly');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonOptions = [
    { id: 'oven', label: 'Inside Oven Deep Degrease', priceUS: 45, priceUK: 38 },
    { id: 'fridge', label: 'Inside Refrigerator & Freezer', priceUS: 40, priceUK: 32 },
    { id: 'windows', label: 'Interior Sash / Glass Polish', priceUS: 55, priceUK: 45 },
    { id: 'pet', label: 'Pet Hair Fiber Treatment', priceUS: 35, priceUK: 30 },
    { id: 'cabinets', label: 'Inside Pantry & Kitchen Cabinets', priceUS: 60, priceUK: 50 },
  ];

  const handleToggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Base pricing logic
  const currentService =
    brandConfig.services.find((s) => s.id === selectedServiceId) ||
    brandConfig.services[0];

  const baseRate = isUS ? currentService.priceUS : currentService.priceUK;

  // Multipliers for scale
  const bedFactor = Math.max(0, bedrooms - 1) * (isUS ? 25 : 20);
  const bathFactor = Math.max(0, bathrooms - 1) * (isUS ? 20 : 16);
  const houseFactor = propertyType === 'house' ? (isUS ? 35 : 28) : 0;

  // Addon costs
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = addonOptions.find((a) => a.id === addonId);
    if (!item) return sum;
    return sum + (isUS ? item.priceUS : item.priceUK);
  }, 0);

  // Subtotal before frequency discount
  const subtotal = baseRate + bedFactor + bathFactor + houseFactor + addonsTotal;

  // Frequency discounts
  let discountPercentage = 0;
  if (frequency === 'weekly') discountPercentage = 0.15;
  if (frequency === 'biweekly') discountPercentage = 0.10;
  if (frequency === 'monthly') discountPercentage = 0.05;

  const discountAmount = Math.round(subtotal * discountPercentage);
  const finalPrice = Math.max(baseRate, subtotal - discountAmount);

  // Approximate time calculation (in hours for a 2-person crew)
  const estimatedHours = Number(
    (1.75 + bedrooms * 0.45 + bathrooms * 0.4 + selectedAddons.length * 0.3).toFixed(1)
  );

  const handleBook = () => {
    onProceedToBooking({
      serviceId: currentService.id,
      bedrooms,
      bathrooms,
      frequency,
      propertyType,
      addons: selectedAddons,
      totalPrice: finalPrice,
      currency: currencySymbol,
      estimatedHours,
    });
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#F6F2EA] border-b border-[#EDE6D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
            No Waiting for Callbacks
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight">
            Transparent instant quote in <span className="italic font-normal text-[#C4623A]">{currencySymbol}</span>.
          </h2>
          <p className="mt-3 text-sm text-[#6B675E]">
            Real rates based on home size and frequency. No hidden petrol charges, supply fees, or contract lock-ins.
          </p>
        </div>

        {/* 2-Column Split: Controls on Left, Live Receipt on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Form Controls */}
          <div className="lg:col-span-7 space-y-8 bg-[#EDE6D8]/30 p-6 sm:p-8 rounded-lg border border-[#EDE6D8]">
            
            {/* 1. Service Type Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-3">
                1. Select Service Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {brandConfig.services.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => onServiceChange(svc.id)}
                    className={`p-3 text-left rounded-md border text-xs font-medium transition-all ${
                      selectedServiceId === svc.id
                        ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34] shadow-xs'
                        : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5] hover:border-[#1F3A34]/40'
                    }`}
                  >
                    <div className="font-serif text-sm leading-tight">{svc.name.split(' ')[0]}</div>
                    <div className="text-[11px] opacity-80 mt-1 line-clamp-1">{svc.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Property Structure */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-3">
                2. Property Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType('apartment')}
                  className={`p-3 rounded-md border text-xs font-medium transition-all text-center ${
                    propertyType === 'apartment'
                      ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34]'
                      : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5] hover:border-[#1F3A34]/40'
                  }`}
                >
                  {unitLabel} / Condo
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType('house')}
                  className={`p-3 rounded-md border text-xs font-medium transition-all text-center ${
                    propertyType === 'house'
                      ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34]'
                      : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5] hover:border-[#1F3A34]/40'
                  }`}
                >
                  House / Townhome / Villa
                </button>
              </div>
            </div>

            {/* 3. Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1F3A34]">
                    Bedrooms
                  </label>
                  <span className="font-serif text-sm font-semibold text-[#1F3A34]">{bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBedrooms(num)}
                      className={`flex-1 py-2 text-xs font-medium rounded-md border transition-colors ${
                        bedrooms === num
                          ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34]'
                          : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5] hover:border-[#1F3A34]/40'
                      }`}
                    >
                      {num === 5 ? '5+' : num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1F3A34]">
                    Bathrooms
                  </label>
                  <span className="font-serif text-sm font-semibold text-[#1F3A34]">{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBathrooms(num)}
                      className={`flex-1 py-2 text-xs font-medium rounded-md border transition-colors ${
                        bathrooms === num
                          ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34]'
                          : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5] hover:border-[#1F3A34]/40'
                      }`}
                    >
                      {num === 4 ? '4+' : num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Cadence / Frequency */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-3">
                3. Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'weekly', label: 'Weekly', save: 'Save 15%' },
                  { id: 'biweekly', label: 'Fortnightly', save: 'Save 10%' },
                  { id: 'monthly', label: 'Monthly', save: 'Save 5%' },
                  { id: 'onetime', label: 'One-Time', save: 'Standard' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFrequency(item.id)}
                    className={`p-2.5 rounded-md border text-center transition-all ${
                      frequency === item.id
                        ? 'bg-[#1F3A34] text-[#F6F2EA] border-[#1F3A34]'
                        : 'bg-[#F6F2EA] text-[#1C1C1A] border-[#dfd6c5] hover:border-[#1F3A34]/40'
                    }`}
                  >
                    <div className="text-xs font-medium">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 ${frequency === item.id ? 'text-[#E9D8A6]' : 'text-[#6B675E]'}`}>
                      {item.save}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Optional Add-ons */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1F3A34] mb-3">
                4. Optional Add-On Tasks
              </label>
              <div className="space-y-2">
                {addonOptions.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const price = isUS ? addon.priceUS : addon.priceUK;
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 rounded-md border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#F6F2EA] border-[#1F3A34] text-[#1F3A34]'
                          : 'bg-[#F6F2EA] border-[#dfd6c5] text-[#6B675E] hover:border-[#1F3A34]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAddon(addon.id)}
                          className="w-4 h-4 rounded text-[#1F3A34] focus:ring-[#C4623A] accent-[#1F3A34]"
                        />
                        <span className="font-medium text-[#1C1C1A]">{addon.label}</span>
                      </div>
                      <span className="font-serif font-semibold text-[#1F3A34]">
                        +{currencySymbol}{price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Live Estimate Breakdown */}
          <div className="lg:col-span-5 sticky top-28 bg-[#F6F2EA] border border-[#dfd6c5] rounded-lg p-6 sm:p-8 shadow-xs">
            <div className="pb-4 border-b border-[#EDE6D8]">
              <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium">
                Live Estimate
              </span>
              <h3 className="font-serif text-2xl text-[#1F3A34] mt-1">
                {currentService.name}
              </h3>
              <p className="text-xs text-[#6B675E] mt-1">
                {bedrooms} bed · {bathrooms} bath · {propertyType === 'house' ? 'House' : unitLabel}
              </p>
            </div>

            <div className="py-5 space-y-3 text-xs text-[#6B675E] border-b border-[#EDE6D8]">
              <div className="flex justify-between">
                <span>Base service rate:</span>
                <span className="font-medium text-[#1C1C1A] tabular-nums">{currencySymbol}{baseRate}</span>
              </div>

              {(bedFactor > 0 || bathFactor > 0 || houseFactor > 0) && (
                <div className="flex justify-between">
                  <span>Room sizing adjustment:</span>
                  <span className="font-medium text-[#1C1C1A] tabular-nums">+{currencySymbol}{bedFactor + bathFactor + houseFactor}</span>
                </div>
              )}

              {addonsTotal > 0 && (
                <div className="flex justify-between">
                  <span>Selected add-ons ({selectedAddons.length}):</span>
                  <span className="font-medium text-[#1C1C1A] tabular-nums">+{currencySymbol}{addonsTotal}</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#1F3A34] font-medium">
                  <span>Frequency discount ({frequency}):</span>
                  <span className="tabular-nums">-{currencySymbol}{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t border-[#EDE6D8] text-xs">
                <span>Estimated duration:</span>
                <span className="font-medium text-[#1C1C1A]">~{estimatedHours} hrs (2 cleaners)</span>
              </div>
            </div>

            {/* Total Price Callout */}
            <div className="pt-6">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#6B675E] font-medium">
                  Total Quote
                </span>
                <div className="text-right">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F3A34] tabular-nums">
                    {currencySymbol}{finalPrice}
                  </span>
                  <span className="text-xs text-[#6B675E] block mt-0.5">
                    {frequency === 'onetime' ? 'single visit' : 'per scheduled visit'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBook}
                className="w-full py-3.5 px-4 text-sm font-medium text-[#F6F2EA] bg-[#C4623A] hover:bg-[#b0532e] active:scale-[0.99] rounded-md transition-all duration-200 shadow-xs text-center"
              >
                Lock in this quote & choose date
              </button>

              <div className="mt-4 pt-4 border-t border-[#EDE6D8] text-[11px] text-[#6B675E] space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <span className="text-[#1F3A34]">✓</span> Same two bonded cleaners guaranteed
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-[#1F3A34]">✓</span> Zero cancellation fee with 48h notice
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-[#1F3A34]">✓</span> Botanical supplies & HEPA extractors included
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
