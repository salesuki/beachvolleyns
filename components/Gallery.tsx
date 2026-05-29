'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const images = [
  { src: '/images/img1.jpg', alt: 'Beach volleyball tournament' },
  { src: '/images/img2.jpg', alt: 'Training session' },
  { src: '/images/img3.jpg', alt: 'Match at Štrand' },
  { src: '/images/img4.jpg', alt: 'Team photo' },
  { src: '/images/img5.jpg', alt: 'Game action' },
  { src: '/images/img6.jpg', alt: 'Tournament action' },
  { src: '/images/img7.jpg', alt: 'Beach volleyball players' },
  { src: '/images/img8.jpg', alt: 'Club event' },
];

export default function Gallery() {
  const { t } = useLanguage();
  const g = t.gallery;
  const [active, setActive] = useState<number | null>(null);

  const prev = () => setActive((p) => (p !== null ? (p - 1 + images.length) % images.length : 0));
  const next = () => setActive((p) => (p !== null ? (p + 1) % images.length : 0));

  return (
    <section
      id="gallery"
      className="py-16 lg:py-20 scroll-mt-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #202657 0%, #1b7eb2 70%, #3093cb 100%)' }}
    >
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '60px' }}>
          <path d="M0,0 C480,60 960,0 1440,0 L1440,0 L0,0 Z" fill="#F5E6C8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
            <span
              className="text-gold text-base font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {g.sectionLabel}
            </span>
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
          </div>
          <h2
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-black uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {g.title}
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
              }`}
              aria-label={`View image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-navy/20 opacity-0 hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 text-white/50 text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {active + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFDF7" />
        </svg>
      </div>
    </section>
  );
}
