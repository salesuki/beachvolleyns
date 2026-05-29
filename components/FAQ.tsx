'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const faq = t.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-10 lg:py-16 scroll-mt-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
            <span
              className="text-ocean text-base font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {faq.sectionLabel}
            </span>
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
          </div>
          <h2
            className="text-navy text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {faq.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 ${
                openIndex === i
                  ? 'bg-navy border-navy shadow-md'
                  : 'bg-white border-sand/80 hover:border-ocean/30 shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean rounded-2xl"
                aria-expanded={openIndex === i}
              >
                <span
                  className={`text-base font-bold uppercase leading-tight ${openIndex === i ? 'text-gold' : 'text-navy'}`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {item.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180 text-gold' : 'text-navy/40'
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
