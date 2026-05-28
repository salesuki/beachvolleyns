'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

function InstagramIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFDF7 0%, #F5E6C8 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
            <span
              className="text-ocean text-sm font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {c.sectionLabel}
            </span>
            <div className="w-8 h-0.5 bg-gold" aria-hidden="true" />
          </div>
          <h2
            className="text-navy text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {c.title}
          </h2>
          <p className="text-navy/65 text-base sm:text-lg max-w-xl mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {c.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact info */}
          <div className="space-y-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/beachvolleyclubns/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-3xl p-5 shadow-sm border border-sand hover:shadow-md hover:border-ocean/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                <InstagramIcon size={22} className="text-white" />
              </div>
              <div>
                <div
                  className="text-xs text-navy/50 uppercase font-bold tracking-widest mb-0.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {c.instagram}
                </div>
                <div className="text-navy font-semibold group-hover:text-ocean transition-colors text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  @beachvolleyclubns
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${c.emailValue}`}
              className="flex items-center gap-4 bg-white rounded-3xl p-5 shadow-sm border border-sand hover:shadow-md hover:border-ocean/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-ocean flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail size={22} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <div
                  className="text-xs text-navy/50 uppercase font-bold tracking-widest mb-0.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {c.email}
                </div>
                <div className="text-navy font-semibold group-hover:text-ocean transition-colors text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {c.emailValue}
                </div>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 bg-white rounded-3xl p-5 shadow-sm border border-sand cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin size={22} className="text-navy" aria-hidden="true" />
              </div>
              <div>
                <div
                  className="text-xs text-navy/50 uppercase font-bold tracking-widest mb-0.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {c.location}
                </div>
                <div className="text-navy font-semibold text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {c.locationValue}
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-sand h-48">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=19.8360%2C45.2470%2C19.8560%2C45.2620&layer=mapnik&marker=45.2543%2C19.8461"
                className="w-full h-full"
                title="Štrand, Novi Sad map"
                loading="lazy"
                aria-label="Map showing Štrand beach location in Novi Sad"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sand">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-ocean/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-ocean" aria-hidden="true" />
                </div>
                <p
                  className="text-navy text-xl font-bold uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {c.formSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-navy/70 text-xs font-bold uppercase tracking-widest mb-1.5"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {c.formName}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-sand rounded-xl px-4 py-3 text-navy bg-cream/60 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-ocean transition-colors text-sm"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-navy/70 text-xs font-bold uppercase tracking-widest mb-1.5"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {c.formEmail}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-sand rounded-xl px-4 py-3 text-navy bg-cream/60 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-ocean transition-colors text-sm"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-navy/70 text-xs font-bold uppercase tracking-widest mb-1.5"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {c.formMessage}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-sand rounded-xl px-4 py-3 text-navy bg-cream/60 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-ocean transition-colors text-sm resize-none"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-gold text-base font-bold uppercase tracking-wider py-4 rounded-xl transition-colors duration-200 cursor-pointer shadow-sm"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    <Send size={16} aria-hidden="true" />
                    {c.formSend}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
