'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Star, Globe, Users, Award, MapPin } from 'lucide-react';

const icons = [Trophy, Star, Globe, Users, Award, MapPin];

export default function Achievements() {
  const { t } = useLanguage();
  const a = t.achievements;

  return (
    <section
      id="achievements"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #202657 0%, #1b7eb2 60%, #3093cb 100%)' }}
    >
      {/* Decorative sand wave top */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '60px' }}>
          <path d="M0,0 C480,60 960,0 1440,0 L1440,0 L0,0 Z" fill="#FFFDF7" />
        </svg>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
            <span
              className="text-gold text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {a.sectionLabel}
            </span>
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
          </div>
          <h2
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {a.title}
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {a.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {a.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-6 hover:bg-white/15 hover:border-gold/30 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      className="text-gold text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {item.year}
                    </div>
                    <h3
                      className="text-white text-xl font-bold uppercase leading-tight"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '80px' }}>
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#FFFDF7" />
        </svg>
      </div>
    </section>
  );
}
