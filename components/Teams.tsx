'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Clock } from 'lucide-react';

export default function Teams() {
  const { t } = useLanguage();
  const tm = t.teams;

  return (
    <section id="teams" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
            <span
              className="text-ocean text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {tm.sectionLabel}
            </span>
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
          </div>
          <h2
            className="text-navy text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {tm.title}
          </h2>
          <p className="text-navy/65 text-base sm:text-lg max-w-xl mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {tm.subtitle}
          </p>
        </div>

        {/* Placeholder grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-3xl bg-sand/50 border-2 border-dashed border-sand flex flex-col items-center justify-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-sand/80 border-2 border-sand flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" fill="#3093cb" fillOpacity="0.4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#3093cb" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <span className="text-navy/30 text-xs font-bold uppercase tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                TBA
              </span>
            </div>
          ))}
        </div>

        {/* Coming soon banner */}
        <div className="flex items-center justify-center gap-3 bg-sand/40 border border-sand rounded-2xl px-6 py-4 max-w-lg mx-auto">
          <Clock size={20} className="text-ocean flex-shrink-0" aria-hidden="true" />
          <p className="text-navy/65 text-sm text-center" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {tm.comingSoon}
          </p>
        </div>
      </div>
    </section>
  );
}
