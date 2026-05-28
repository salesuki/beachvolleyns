'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navIds = ['about', 'achievements', 'training', 'tournaments', 'teams', 'gallery', 'faq', 'contact'] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
            aria-label="Scroll to top"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Novi Sad Beach Volleyball Club"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className="hidden sm:block text-white font-display font-bold text-sm lg:text-base leading-tight uppercase tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              NS Beach<br />Volleyball
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navIds.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/80 hover:text-gold text-sm font-medium uppercase tracking-wider px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {t.nav[id as keyof typeof t.nav]}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 gap-0.5">
              <button
                onClick={() => setLang('sr')}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  lang === 'sr' ? 'bg-gold text-navy' : 'text-white hover:text-gold'
                }`}
              >
                SR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  lang === 'en' ? 'bg-gold text-navy' : 'text-white hover:text-gold'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA button */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:block bg-gold hover:bg-yellow text-navy text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.nav.joinUs}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2 rounded-md cursor-pointer hover:bg-white/10 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-navy/98 backdrop-blur-md border-t border-white/10 py-4">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-white/80 hover:text-gold hover:bg-white/5 text-left text-base font-semibold uppercase tracking-wider px-4 py-3 transition-colors duration-200 cursor-pointer"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {t.nav[id as keyof typeof t.nav]}
                </button>
              ))}
              <div className="px-4 pt-3">
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full bg-gold hover:bg-yellow text-navy text-base font-bold uppercase tracking-wider py-3 rounded-full transition-colors duration-200 cursor-pointer"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {t.nav.joinUs}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
