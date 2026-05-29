'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GalleryImage } from '@/lib/supabase/types';

const CATEGORIES = [
  { key: null,        sr: 'Sve',      en: 'All'         },
  { key: 'turniri',   sr: 'Turniri',  en: 'Tournaments' },
  { key: 'treninzi',  sr: 'Treninzi', en: 'Training'    },
  { key: 'ekipa',     sr: 'Ekipa',    en: 'Team'        },
] as const;

type CategoryKey = typeof CATEGORIES[number]['key'];

export default function GalleryPageClient({ images }: { images: GalleryImage[] }) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory
    ? images.filter(img => img.category === activeCategory)
    : images;

  const prev = () => setLightbox(p => p !== null ? (p - 1 + filtered.length) % filtered.length : 0);
  const next = () => setLightbox(p => p !== null ? (p + 1) % filtered.length : 0);

  return (
    <main className="min-h-screen" style={{ background: '#FFFDF7' }}>
      {/* Hero header */}
      <div className="relative overflow-hidden pt-20" style={{ background: 'linear-gradient(135deg, #202657 0%, #1b7eb2 70%, #3093cb 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-wider transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#dfd344')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <ArrowLeft size={16} />
            {lang === 'sr' ? 'Nazad na sajt' : 'Back to site'}
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
            <span className="text-gold text-base font-bold uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {lang === 'sr' ? 'Klub' : 'Club'}
            </span>
          </div>
          <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {lang === 'sr' ? 'Galerija' : 'Gallery'}
          </h1>
        </div>
        {/* Bottom wave */}
        <div aria-hidden="true">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '60px' }}>
            <path d="M0,40 C360,60 1080,20 1440,40 L1440,60 L0,60 Z" fill="#FFFDF7" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={String(cat.key)}
                onClick={() => setActiveCategory(cat.key)}
                className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider cursor-pointer transition-all duration-200"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  background: isActive ? '#202657' : 'white',
                  color: isActive ? '#dfd344' : '#202657',
                  border: '2px solid',
                  borderColor: isActive ? '#202657' : '#F5E6C8',
                  boxShadow: isActive ? '0 4px 12px rgba(32,38,87,0.2)' : 'none',
                }}
              >
                {lang === 'sr' ? cat.sr : cat.en}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p className="mb-6 text-sm" style={{ color: 'rgba(32,38,87,0.4)', fontFamily: "'Barlow', sans-serif" }}>
          {filtered.length} {lang === 'sr' ? 'fotografija' : 'photos'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center" style={{ color: 'rgba(32,38,87,0.35)', fontFamily: "'Barlow', sans-serif" }}>
            {lang === 'sr' ? 'Nema fotografija u ovoj kategoriji.' : 'No photos in this category.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {filtered.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setLightbox(i)}
                className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean ${
                  i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                }`}
                aria-label={(lang === 'sr' ? img.alt_sr : img.alt_en) ?? 'Fotografija'}
              >
                <Image
                  src={img.url}
                  alt={(lang === 'sr' ? img.alt_sr : img.alt_en) ?? ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(32,38,87,0.25)' }} aria-hidden="true" />
                {img.category && (
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100">
                    <span className="bg-gold text-navy text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {lang === 'sr'
                        ? CATEGORIES.find(c => c.key === img.category)?.sr
                        : CATEGORIES.find(c => c.key === img.category)?.en}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(32,38,87,0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
          role="dialog" aria-modal="true"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 rounded-full p-2 transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 rounded-full p-3 transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full" onClick={e => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].url}
              alt={(lang === 'sr' ? filtered[lightbox].alt_sr : filtered[lightbox].alt_en) ?? ''}
              fill className="object-contain" sizes="100vw"
            />
          </div>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 rounded-full p-3 transition-colors cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Barlow Condensed', sans-serif" }}>
            {lightbox + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  );
}
