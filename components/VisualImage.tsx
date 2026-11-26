'use client';

import { useState } from 'react';
import type { StaticImageData } from 'next/image';
import { Utensils } from 'lucide-react';

interface VisualImageProps {
  asset: StaticImageData;
  alt: string;
  className?: string;
  fallbackTitle: string;
  priority?: boolean;
}

export function VisualImage({
  asset,
  alt,
  className = '',
  fallbackTitle,
  priority = false,
}: VisualImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#241F1B] via-[#1A1714] to-[#110F0D] p-6 text-center ${className}`}
      >
        <Utensils className="h-7 w-7 text-[#D9822B]" aria-hidden="true" />
        <span className="font-serif text-base text-[#F4EFE6]">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={asset.src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
