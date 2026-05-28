'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, ArrowRight, Shirt, Droplets, Glasses, Sun } from 'lucide-react';

const equipIcons = [Shirt, Droplets, Glasses, Sun];

export default function Training() {
  const { t } = useLanguage();
  const tr = t.training;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="training" className="py-20 lg:py-28 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
            <span
              className="text-ocean text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {tr.sectionLabel}
            </span>
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
          </div>
          <h2
            className="text-navy text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {tr.title}
          </h2>
          <p className="text-navy/65 text-base sm:text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {tr.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: groups + how to join */}
          <div className="space-y-6">
            {/* Training groups */}
            {tr.groups.map((group, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 shadow-sm border border-sand/60 hover:shadow-md transition-shadow duration-200 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-black text-navy/20 bg-sand/50"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="text-navy text-xl font-bold uppercase"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {group.name}
                      </h3>
                      <span className="bg-ocean/15 text-ocean text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                        {group.ages}
                      </span>
                    </div>
                    <p className="text-navy/60 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      {group.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <button
              onClick={scrollToContact}
              className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-gold text-lg font-bold uppercase tracking-wider py-4 rounded-full transition-colors duration-200 cursor-pointer shadow-md"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {tr.ctaLabel}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Right: image + steps + equipment */}
          <div className="space-y-6">
            {/* Photo */}
            <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/img5.jpg"
                alt="Beach volleyball training session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" aria-hidden="true" />
            </div>

            {/* Steps */}
            <div className="bg-navy rounded-3xl p-6">
              <h3
                className="text-gold text-xl font-bold uppercase mb-5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {tr.howToJoin}
              </h3>
              <div className="space-y-4">
                {tr.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-white/85 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-sand/40 rounded-3xl p-6 border border-sand">
              <h3
                className="text-navy text-xl font-bold uppercase mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {tr.equipment}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tr.equipmentList.map((item, i) => {
                  const Icon = equipIcons[i % equipIcons.length];
                  return (
                    <div key={i} className="flex items-center gap-2 text-navy/75 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      <Icon size={16} className="text-ocean flex-shrink-0" aria-hidden="true" />
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
