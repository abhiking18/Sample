import React, { useState, useEffect, useRef, useCallback } from 'react';
import { brandConfig } from '../config/brand';
import { CustomerReview, Region } from '../types';

interface ReviewsCarouselProps {
  region: Region;
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ region }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const reviews: CustomerReview[] = brandConfig.reviews;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextReview();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextReview]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      nextReview();
    } else if (diff < -45) {
      prevReview();
    }
    setTouchStartX(null);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setMouseStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown || mouseStartX === null) return;
    const mouseEndX = e.clientX;
    const diff = mouseStartX - mouseEndX;

    if (diff > 50) {
      nextReview();
    } else if (diff < -50) {
      prevReview();
    }
    setIsMouseDown(false);
    setMouseStartX(null);
  };

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-[#EDE6D8]/40 border-b border-[#EDE6D8] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsMouseDown(false);
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6B675E] font-medium block mb-2">
              Human Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F3A34] tracking-tight">
              Words from homes we <span className="italic font-normal text-[#C4623A]">protect</span>.
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={prevReview}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-[#1F3A34] text-[#1F3A34] hover:bg-[#1F3A34] hover:text-[#F6F2EA] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextReview}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-[#1F3A34] text-[#1F3A34] hover:bg-[#1F3A34] hover:text-[#F6F2EA] flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swipeable Carousel Track */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="cursor-grab active:cursor-grabbing select-none"
        >
          <div className="relative min-h-[300px] sm:min-h-[260px] bg-[#F6F2EA] p-8 sm:p-12 rounded-lg border border-[#EDE6D8] shadow-xs flex flex-col justify-between">
            <div>
              {/* Star rating and region label */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-[#1F3A34]">
                  {'★'.repeat(reviews[currentIndex].rating)}
                </div>
                <div className="text-xs text-[#6B675E]">
                  <span>{reviews[currentIndex].city}</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span>{reviews[currentIndex].duration}</span>
                </div>
              </div>

              {/* The natural quote */}
              <blockquote className="font-serif text-lg sm:text-2xl text-[#1F3A34] leading-relaxed">
                “{reviews[currentIndex].quote}”
              </blockquote>
            </div>

            {/* Author info */}
            <div className="mt-8 pt-6 border-t border-[#EDE6D8] flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-[#1C1C1A]">
                  {reviews[currentIndex].author}
                </p>
                <p className="text-xs text-[#6B675E]">
                  {reviews[currentIndex].neighborhood}, {reviews[currentIndex].city}
                </p>
              </div>

              {/* Review counter */}
              <div className="text-xs text-[#6B675E] font-medium">
                {currentIndex + 1} <span className="opacity-40">/</span> {reviews.length}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full ${
                currentIndex === idx
                  ? 'w-8 bg-[#1F3A34]'
                  : 'w-2 bg-[#dfd6c5] hover:bg-[#6B675E]'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
