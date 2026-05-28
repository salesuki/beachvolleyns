'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

function InstagramIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

const navIds = [
  { id: 'about', labelKey: 'about' },
  { id: 'achievements', labelKey: 'achievements' },
  { id: 'training', labelKey: 'training' },
  { id: 'tournaments', labelKey: 'tournaments' },
  { id: 'gallery', labelKey: 'gallery' },
  { id: 'contact', labelKey: 'contact' },
] as const;

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="Novi Sad Beach Volleyball Club"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div
                  className="text-white font-black text-lg uppercase leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  NS Beach<br />Volleyball
                </div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Štrand, Novi Sad, Srbija
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-gold text-xs font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2" aria-label="Footer navigation">
              {navIds.map(({ id, labelKey }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-white/60 hover:text-gold text-sm text-left uppercase font-semibold tracking-wide transition-colors duration-200 cursor-pointer"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {t.nav[labelKey]}
                </button>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3
              className="text-gold text-xs font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {t.footer.followUs}
            </h3>
            <a
              href="https://www.instagram.com/beachvolleyclubns/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl px-4 py-3 transition-colors duration-200 cursor-pointer group"
            >
              <InstagramIcon size={20} className="text-white/70 group-hover:text-gold transition-colors" />
              <span className="text-white/70 group-hover:text-white transition-colors text-sm font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
                @beachvolleyclubns
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white/35 text-xs uppercase tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            © {new Date().getFullYear()} Novi Sad Beach Volleyball Club. {t.footer.rights}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-gold text-xs" aria-hidden="true">☀</span>
            </div>
            <span className="text-white/25 text-xs tracking-wide uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Štrand · Novi Sad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
