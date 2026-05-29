'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {/* autoplay blocked — video stays paused */});
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(32,38,87,0.65) 0%, rgba(27,126,178,0.45) 50%, rgba(32,38,87,0.80) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFDF7" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" aria-hidden="true" />
          <span
            className="text-gold text-sm font-semibold uppercase tracking-widest"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t.hero.tagline}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-wide mb-6"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {t.hero.title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 0 ? (
                line
              ) : (
                <>
                  <span className="text-gold">{line.split(' ').slice(0, 2).join(' ')}</span>
                  {' '}
                  <span className="text-white">{line.split(' ').slice(2).join(' ')}</span>
                </>
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/85 text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="bg-gold hover:bg-yellow text-navy text-lg font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer min-w-[220px]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t.hero.ctaPrimary}
          </button>
          <button
            onClick={scrollToAbout}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-lg font-bold uppercase tracking-wider px-8 py-4 rounded-full border border-white/30 hover:border-white/50 transition-all duration-200 cursor-pointer min-w-[220px]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-gold transition-colors duration-200 cursor-pointer animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
