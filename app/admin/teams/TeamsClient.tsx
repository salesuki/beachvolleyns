'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { TeamMember } from '@/lib/supabase/types';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

type FormData = Omit<TeamMember, 'id' | 'created_at'>;

const emptyForm = (): FormData => ({
  name: '',
  role: '',
  category: 'player',
  description: '',
  photo_url: '',
  display_order: 0,
  active: true,
});

function MemberModal({
  member,
  onSave,
  onClose,
}: {
  member: Partial<TeamMember> | null;
  onSave: (data: FormData) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>(
    member ? { name: member.name ?? '', role: member.role ?? '', category: member.category ?? 'player', description: member.description ?? '', photo_url: member.photo_url ?? '', display_order: member.display_order ?? 0, active: member.active ?? true } : emptyForm()
  );
  const [saving, setSaving] = useState(false);

  const f = (k: keyof FormData, v: string | boolean | number) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const inputStyle = { background: '#0f1421', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: '10px', padding: '10px 14px', width: '100%', fontSize: '14px', outline: 'none' };
  const labelStyle = { color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-white font-black uppercase text-lg" style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}>
            {member?.id ? 'Uredi člana' : 'Dodaj člana'}
          </h3>
          <button onClick={onClose} className="cursor-pointer" style={{ color: 'rgba(255,255,255,0.4)' }}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Ime</label>
              <input required style={inputStyle} value={form.name} onChange={e => f('name', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Pozicija / Uloga</label>
              <input required style={inputStyle} value={form.role} onChange={e => f('role', e.target.value)} placeholder="npr. Igrač, Trener" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Kategorija</label>
              <select style={inputStyle} value={form.category} onChange={e => f('category', e.target.value)}>
                <option value="player">Igrač</option>
                <option value="coach">Trener</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Redosled prikaza</label>
              <input type="number" style={inputStyle} value={form.display_order} onChange={e => f('display_order', Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Opis (opciono)</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'none' }} value={form.description ?? ''} onChange={e => f('description', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>URL fotografije (opciono)</label>
            <input style={inputStyle} value={form.photo_url ?? ''} onChange={e => f('photo_url', e.target.value)} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <input id="active-check" type="checkbox" checked={form.active} onChange={e => f('active', e.target.checked)} style={{ accentColor: '#dfd344', width: '16px', height: '16px', cursor: 'pointer' }} />
            <label htmlFor="active-check" style={{ ...labelStyle, margin: 0 }}>Aktivan (prikazuje se na sajtu)</label>
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

export default function TeamsClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [modal, setModal] = useState<{ open: boolean; member: Partial<TeamMember> | null }>({ open: false, member: null });
  const supabase = createClient();

  const openAdd = () => setModal({ open: true, member: null });
  const openEdit = (m: TeamMember) => setModal({ open: true, member: m });
  const closeModal = () => setModal({ open: false, member: null });

  const handleSave = async (data: FormData) => {
    if (modal.member?.id) {
      const { data: updated } = await supabase.from('team_members').update(data).eq('id', modal.member.id).select().single();
      if (updated) setMembers(ms => ms.map(m => m.id === updated.id ? updated : m));
    } else {
      const { data: created } = await supabase.from('team_members').insert(data).select().single();
      if (created) setMembers(ms => [...ms, created]);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Obriši ovog člana?')) return;
    await supabase.from('team_members').delete().eq('id', id);
    setMembers(ms => ms.filter(m => m.id !== id));
  };

  const players = members.filter(m => m.category === 'player');
  const coaches = members.filter(m => m.category === 'coach');

  const renderGroup = (title: string, items: TeamMember[]) => (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span className="text-white font-bold uppercase text-sm tracking-widest" style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}>{title}</span>
      </div>
      {!items.length ? (
        <div className="px-5 py-8 text-center" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>Nema članova. Dodaj prvog.</div>
      ) : (
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {items.map(m => (
            <div key={m.id} className="flex items-center gap-4 px-5 py-3">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: '#202657' }}>
                {m.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sky text-sm font-bold" style={{ color: '#3093cb' }}>{m.name[0]}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm">{m.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{m.role}</div>
              </div>
              {!m.active && (
                <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}>neaktivan</span>
              )}
              <button onClick={() => openEdit(m)} className="p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors" style={{ color: '#3093cb' }} aria-label="Uredi">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(m.id)} className="p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors" style={{ color: '#f87171' }} aria-label="Obriši">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider cursor-pointer"
          style={{ background: '#dfd344', color: '#202657', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
        >
          <Plus size={16} /> Dodaj člana
        </button>
      </div>

      <div className="space-y-4">
        {renderGroup('Igrači', players)}
        {renderGroup('Treneri', coaches)}
      </div>

      {modal.open && (
        <MemberModal member={modal.member} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  );
}
