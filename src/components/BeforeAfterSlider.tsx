import React, { useState, useRef, useCallback } from 'react';
import { brandConfig } from '../config/brand';
import { BeforeAfterSet } from '../types';

export const BeforeAfterSlider: React.FC = () => {
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSet: BeforeAfterSet = brandConfig.beforeAfterSets[selectedSetIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#EDE6D8]/30 border-b border-[#EDE6D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
              Tangible Evidence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight">
              Before & after, <span className="italic font-normal text-[#C4623A]">untouched</span>.
            </h2>
          </div>
          <p className="text-sm text-[#6B675E] max-w-md">
            Drag the divider across each room to inspect real restorations completed with our gentle plant pastes.
          </p>
        </div>

        {/* Room Selector Segmented Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {brandConfig.beforeAfterSets.map((set, idx) => (
            <button
              key={set.id}
              type="button"
              onClick={() => {
                setSelectedSetIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                selectedSetIndex === idx
                  ? 'bg-[#1F3A34] text-[#F6F2EA] shadow-xs'
                  : 'bg-[#F6F2EA] text-[#6B675E] hover:text-[#1C1C1A] border border-[#dfd6c5]'
              }`}
            >
              {set.room}
            </button>
          ))}
        </div>

        {/* Draggable Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-[#EDE6D8] shadow-xs select-none cursor-ew-resize bg-[#EDE6D8]"
            >
              {/* After Image (Full background) */}
              <img
                src={currentSet.afterImage}
                alt={`${currentSet.room} after cleaning`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-[#1F3A34]/90 text-[#F6F2EA] text-[11px] font-medium px-2.5 py-1 rounded shadow-xs pointer-events-none">
                After Hearth & Home
              </div>

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentSet.beforeImage}
                  alt={`${currentSet.room} before cleaning`}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-[#1C1C1A]/85 text-[#F6F2EA] text-[11px] font-medium px-2.5 py-1 rounded shadow-xs pointer-events-none">
                  Before
                </div>
              </div>

              {/* Vertical Slider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#F6F2EA] pointer-events-none shadow-md"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Drag Handle Button */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1F3A34] text-[#F6F2EA] border-2 border-[#F6F2EA] flex items-center justify-center shadow-md">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#6B675E]">
              <span>← Slide left for After</span>
              <span className="italic">Touch or drag anywhere on image</span>
              <span>Slide right for Before →</span>
            </div>
          </div>

          {/* Accompanying Editorial Story */}
          <div className="lg:col-span-4 bg-[#F6F2EA] p-6 sm:p-7 rounded-lg border border-[#EDE6D8]">
            <span className="text-[11px] uppercase tracking-wider text-[#C4623A] font-semibold block">
              Case Examination
            </span>
            <h3 className="font-serif text-2xl text-[#1F3A34] mt-1 tracking-tight">
              {currentSet.title}
            </h3>
            <p className="text-xs text-[#6B675E] mt-1 font-medium">
              {currentSet.subtitle}
            </p>
            <p className="text-sm text-[#6B675E] mt-4 leading-relaxed">
              {currentSet.story}
            </p>

            <div className="mt-6 pt-5 border-t border-[#EDE6D8] space-y-2 text-xs text-[#1F3A34]">
              <div className="flex items-center gap-2">
                <span className="font-bold">✓</span>
                <span>Gentle pH-balanced formulations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">✓</span>
                <span>Zero abrasives that micro-scratch finishes</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
