'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
          <span
            className="text-ocean text-sm font-bold uppercase tracking-widest"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {a.sectionLabel}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <h2
              className="text-navy text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight mb-8"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {a.title}
            </h2>

            <div className="space-y-5 text-navy/75 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <p>{a.p1}</p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 bg-sand/60 rounded-2xl px-4 py-3">
                <Calendar size={18} className="text-ocean flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-navy/60 uppercase tracking-wide font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {a.founded}
                  </div>
                  <div className="text-navy font-bold text-sm">2021</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-sand/60 rounded-2xl px-4 py-3">
                <MapPin size={18} className="text-ocean flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-navy/60 uppercase tracking-wide font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {a.location}
                  </div>
                  <div className="text-navy font-bold text-sm">{a.locationValue}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg row-span-2">
              <Image
                src="/images/img2.jpg"
                alt="Beach volleyball training at Štrand"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/img3.jpg"
                alt="Beach volleyball match"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/img4.jpg"
                alt="Players at the beach volleyball club"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
