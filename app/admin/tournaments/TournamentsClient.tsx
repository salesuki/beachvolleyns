'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Tournament } from '@/lib/supabase/types';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

type FormData = Omit<Tournament, 'id' | 'created_at'>;

const emptyForm = (): FormData => ({
  name_sr: '', name_en: '', badge_sr: '', badge_en: '',
  description_sr: '', description_en: '',
  category: null, event_date: null, active: true, display_order: 0,
});

const categoryLabels: Record<string, string> = {
  professional: 'Profesionalni',
  mens: 'Muška kategorija',
  womens: 'Ženska kategorija',
  mix: 'Mix',
};

function TournamentModal({
  tournament, onSave, onClose,
}: {
  tournament: Partial<Tournament> | null;
  onSave: (data: FormData) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>(
    tournament
      ? { name_sr: tournament.name_sr ?? '', name_en: tournament.name_en ?? '', badge_sr: tournament.badge_sr ?? '', badge_en: tournament.badge_en ?? '', description_sr: tournament.description_sr ?? '', description_en: tournament.description_en ?? '', category: tournament.category ?? null, event_date: tournament.event_date ?? null, active: tournament.active ?? true, display_order: tournament.display_order ?? 0 }
      : emptyForm()
  );
  const [saving, setSaving] = useState(false);
  const f = (k: keyof FormData, v: string | boolean | number | null) => setForm(p => ({ ...p, [k]: v || null }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const inputStyle = { background: '#0f1421', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: '10px', padding: '10px 14px', width: '100%', fontSize: '14px', outline: 'none' };
  const labelStyle = { color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden my-8" style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-white font-black uppercase text-lg" style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}>
            {tournament?.id ? 'Uredi turnir' : 'Dodaj turnir'}
          </h3>
          <button onClick={onClose} className="cursor-pointer" style={{ color: 'rgba(255,255,255,0.4)' }}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Naziv (SR) *</label>
              <input required style={inputStyle} value={form.name_sr} onChange={e => setForm(p => ({ ...p, name_sr: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Naziv (EN)</label>
              <input style={inputStyle} value={form.name_en ?? ''} onChange={e => f('name_en', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Badge (SR)</label>
              <input style={inputStyle} value={form.badge_sr ?? ''} onChange={e => f('badge_sr', e.target.value)} placeholder="npr. Godišnje" />
            </div>
            <div>
              <label style={labelStyle}>Badge (EN)</label>
              <input style={inputStyle} value={form.badge_en ?? ''} onChange={e => f('badge_en', e.target.value)} placeholder="e.g. Annual" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Opis (SR)</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'none' }} value={form.description_sr ?? ''} onChange={e => f('description_sr', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Opis (EN)</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'none' }} value={form.description_en ?? ''} onChange={e => f('description_en', e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label style={labelStyle}>Kategorija</label>
              <select style={inputStyle} value={form.category ?? ''} onChange={e => f('category', e.target.value)}>
                <option value="">—</option>
                <option value="professional">Profesionalni</option>
                <option value="mens">Muška</option>
                <option value="womens">Ženska</option>
                <option value="mix">Mix</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Datum</label>
              <input type="date" style={inputStyle} value={form.event_date ?? ''} onChange={e => f('event_date', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Redosled</label>
              <input type="number" style={inputStyle} value={form.display_order} onChange={e => setForm(p => ({ ...p, display_order: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input id="t-active" type="checkbox" checked={form.active} onChange={e => setForm(p => ({ ...p, active: e.target.checked }))} style={{ accentColor: '#dfd344', width: '16px', height: '16px', cursor: 'pointer' }} />
            <label htmlFor="t-active" style={{ ...labelStyle, margin: 0 }}>Aktivan (prikazuje se na sajtu)</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl py-2.5 text-sm font-bold uppercase cursor-pointer" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}>
              Otkaži
            </button>
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold uppercase cursor-pointer disabled:opacity-60" style={{ background: '#dfd344', color: '#202657', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}>
              <Save size={14} />
              {saving ? 'Čuvam...' : 'Sačuvaj'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TournamentsClient({ initialTournaments }: { initialTournaments: Tournament[] }) {
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [modal, setModal] = useState<{ open: boolean; tournament: Partial<Tournament> | null }>({ open: false, tournament: null });
  const supabase = createClient();

  const handleSave = async (data: FormData) => {
    if (modal.tournament?.id) {
      const { data: updated } = await supabase.from('tournaments').update(data).eq('id', modal.tournament.id).select().single();
      if (updated) setTournaments(ts => ts.map(t => t.id === updated.id ? updated : t));
    } else {
      const { data: created } = await supabase.from('tournaments').insert(data).select().single();
      if (created) setTournaments(ts => [...ts, created]);
    }
    setModal({ open: false, tournament: null });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Obriši ovaj turnir?')) return;
    await supabase.from('tournaments').delete().eq('id', id);
    setTournaments(ts => ts.filter(t => t.id !== id));
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setModal({ open: true, tournament: null })}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider cursor-pointer"
          style={{ background: '#dfd344', color: '#202657', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
        >
          <Plus size={16} /> Dodaj turnir
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.07)' }}>
        {!tournaments.length ? (
          <div className="px-5 py-16 text-center" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
            Nema turnira. Dodaj prvi.
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {tournaments.map(t => (
              <div key={t.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{t.name_sr}</span>
                    {t.category && (
                      <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: 'rgba(27,126,178,0.2)', color: '#3093cb' }}>
                        {categoryLabels[t.category] ?? t.category}
                      </span>
                    )}
                    {!t.active && (
                      <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}>neaktivan</span>
                    )}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '2px' }}>
                    {t.badge_sr && <span>{t.badge_sr}</span>}
                    {t.event_date && <span> · {new Date(t.event_date).toLocaleDateString('sr-RS')}</span>}
                  </div>
                </div>
                <button onClick={() => setModal({ open: true, tournament: t })} className="p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors" style={{ color: '#3093cb' }} aria-label="Uredi">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors" style={{ color: '#f87171' }} aria-label="Obriši">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal.open && (
        <TournamentModal tournament={modal.tournament} onSave={handleSave} onClose={() => setModal({ open: false, tournament: null })} />
      )}
    </>
  );
}
