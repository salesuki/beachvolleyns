'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ContactSubmission } from '@/lib/supabase/types';
import { Mail, MailOpen, Trash2, ChevronDown } from 'lucide-react';

export default function MessagesClient({ initialMessages }: { initialMessages: ContactSubmission[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [expanded, setExpanded] = useState<string | null>(null);

  const supabase = createClient();

  const markRead = async (id: string) => {
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id);
    setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMsg = async (id: string) => {
    await supabase.from('contact_submissions').delete().eq('id', id);
    setMessages(ms => ms.filter(m => m.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const toggleExpand = async (id: string) => {
    const isOpening = expanded !== id;
    setExpanded(isOpening ? id : null);
    if (isOpening) {
      const msg = messages.find(m => m.id === id);
      if (msg && !msg.read) await markRead(id);
    }
  };

  if (!messages.length) {
    return (
      <div
        className="rounded-2xl px-6 py-16 text-center"
        style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <MailOpen size={32} style={{ color: 'rgba(255,255,255,0.2)', margin: '0 auto 12px' }} />
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Još nema poruka.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {messages.map(msg => (
        <div
          key={msg.id}
          className="rounded-2xl overflow-hidden transition-all duration-200"
          style={{ background: '#1a2035', border: `1px solid ${expanded === msg.id ? 'rgba(223,211,68,0.3)' : 'rgba(255,255,255,0.07)'}` }}
        >
          {/* Header row */}
          <button
            onClick={() => toggleExpand(msg.id)}
            className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer"
          >
            <div className="flex-shrink-0">
              {msg.read
                ? <MailOpen size={16} style={{ color: 'rgba(255,255,255,0.25)' }} />
                : <Mail size={16} style={{ color: '#dfd344' }} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-semibold text-sm ${msg.read ? 'text-white/60' : 'text-white'}`}>
                  {msg.name}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{msg.email}</span>
                {!msg.read && (
                  <span className="rounded-full px-2 py-0.5 text-xs font-bold uppercase" style={{ background: 'rgba(223,211,68,0.15)', color: '#dfd344' }}>
                    novo
                  </span>
                )}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {msg.message}
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-3">
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
                {new Date(msg.created_at).toLocaleDateString('sr-RS')}
              </span>
              <ChevronDown
                size={16}
                style={{ color: 'rgba(255,255,255,0.3)', transform: expanded === msg.id ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}
              />
            </div>
          </button>

          {/* Expanded */}
          {expanded === msg.id && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '16px 20px' }}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {msg.message}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={`mailto:${msg.email}?subject=Re: Poruka sa sajta`}
                  className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer transition-opacity hover:opacity-80"
                  style={{ background: '#1b7eb2', color: 'white', textDecoration: 'none', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
                >
                  Odgovori
                </a>
                <button
                  onClick={() => deleteMsg(msg.id)}
                  className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer transition-opacity hover:opacity-80 flex items-center gap-1.5"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
                >
                  <Trash2 size={12} />
                  Obriši
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
