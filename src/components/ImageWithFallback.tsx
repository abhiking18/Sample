import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackLabel,
  aspectRatioClass = 'aspect-[4/3]',
  className = '',
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#EDE6D8] ${aspectRatioClass} ${className}`}>
      {/* Shimmer skeleton before image loads */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-[#EDE6D8] animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#F6F2EA]/40 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      )}

      {/* Styled warm fallback when image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#EDE6D8] border border-[#d8cfbe] text-[#6B675E]">
          <svg
            className="w-8 h-8 mb-2 text-[#1F3A34]/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <p className="font-serif text-sm font-medium text-[#1F3A34]">Hearth & Home</p>
          <p className="text-xs text-[#6B675E] mt-0.5 line-clamp-2">
            {fallbackLabel || alt || 'Natural, thoughtful domestic care'}
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...rest}
        />
      )}
    </div>
  );
};
