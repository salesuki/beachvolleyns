'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Sparkles } from 'lucide-react';

export default function Tournaments() {
  const { t } = useLanguage();
  const tn = t.tournaments;

  return (
    <section
      id="tournaments"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FEF9EC 0%, #F5E6C8 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-ocean" aria-hidden="true" />
              <span
                className="text-ocean text-sm font-bold uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {tn.sectionLabel}
              </span>
            </div>
            <h2
              className="text-navy text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {tn.title}
            </h2>
          </div>
          <p className="text-navy/65 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {tn.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main event — featured */}
          <div className="lg:col-span-1 row-span-2 relative rounded-3xl overflow-hidden shadow-lg">
            <div className="relative h-48 lg:h-full min-h-[300px]">
              <Image
                src="/images/img1.jpg"
                alt="International beach volleyball tournament at Štrand"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(32,38,87,0.90) 0%, rgba(32,38,87,0.30) 60%, transparent 100%)' }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="bg-gold text-navy text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-3">
                  {tn.events[0].badge}
                </span>
                <h3
                  className="text-white text-2xl font-black uppercase leading-tight mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {tn.events[0].name}
                </h3>
                <p className="text-white/75 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {tn.events[0].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Amateur events */}
          {tn.events.slice(1).map((event, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-sm border border-sand hover:shadow-md transition-shadow duration-200 cursor-default"
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-ocean" aria-hidden="true" />
                <span className="bg-ocean/10 text-ocean text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                  {event.badge}
                </span>
              </div>
              <h3
                className="text-navy text-xl font-bold uppercase leading-tight mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {event.name}
              </h3>
              <p className="text-navy/60 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                {event.desc}
              </p>
            </div>
          ))}

          {/* Upcoming teaser */}
          <div className="bg-navy rounded-3xl p-6 lg:col-span-2 flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Sparkles size={22} className="text-gold" aria-hidden="true" />
            </div>
            <p className="text-white/85 text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>
              {tn.upcoming}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
