'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleGalleryProps {
  images: string[];
  alt: string;
}

export default function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [current, setCurrent] = useState(0);

  const safeImages =
    images.length > 0 ? images : ['/images/placeholder-car.jpg'];

  const prev = () =>
    setCurrent((c) => (c === 0 ? safeImages.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === safeImages.length - 1 ? 0 : c + 1));

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image
          src={safeImages[current]}
          alt={`${alt} - Foto ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />

        {safeImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Próxima foto"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Counter */}
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {current + 1} / {safeImages.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === current
                  ? 'border-primary-light ring-1 ring-primary-light'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${alt} - Miniatura ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
