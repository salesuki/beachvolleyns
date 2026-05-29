'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { GalleryImage } from '@/lib/supabase/types';
import { Upload, Trash2, Plus, X, Save } from 'lucide-react';

function AddImageModal({ onAdd, onClose }: { onAdd: (img: GalleryImage) => void; onClose: () => void }) {
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [url, setUrl] = useState('');
  const [altSr, setAltSr] = useState('');
  const [altEn, setAltEn] = useState('');
  const [category, setCategory] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const inputStyle = { background: '#0f1421', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: '10px', padding: '10px 14px', width: '100%', fontSize: '14px', outline: 'none' };
  const labelStyle = { color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '6px', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' };

  const saveImage = async (imageUrl: string) => {
    const { data, error: err } = await supabase
      .from('gallery_images')
      .insert({ url: imageUrl, alt_sr: altSr || null, alt_en: altEn || null, category: (category || null) as GalleryImage['category'], display_order: 99 })
      .select()
      .single();
    if (err || !data) { setError('Greška pri čuvanju.'); setUploading(false); return; }
    onAdd(data);
    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('gallery').upload(path, file);
    if (upErr) { setError('Upload nije uspeo. Proveri da li postoji "gallery" bucket u Supabase.'); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(path);
    await saveImage(publicUrl);
  };

  const handleUrlSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setUploading(true);
    await saveImage(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-white font-black uppercase text-lg" style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}>
            Dodaj fotografiju
          </h3>
          <button onClick={onClose} className="cursor-pointer" style={{ color: 'rgba(255,255,255,0.4)' }}><X size={18} /></button>
        </div>

        {/* Tabs */}
        <div className="flex px-5 pt-4 gap-2">
          {(['upload', 'url'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
              style={{
                fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif',
                background: tab === t ? '#dfd344' : 'rgba(255,255,255,0.07)',
                color: tab === t ? '#202657' : 'rgba(255,255,255,0.5)',
              }}
            >
              {t === 'upload' ? 'Upload fajla' : 'URL linka'}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-4">
          {tab === 'upload' ? (
            <div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full rounded-xl py-10 flex flex-col items-center gap-3 cursor-pointer transition-colors disabled:opacity-60"
                style={{ background: 'rgba(255,255,255,0.04)', border: '2px dashed rgba(255,255,255,0.15)' }}
              >
                <Upload size={28} style={{ color: 'rgba(255,255,255,0.3)' }} />
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                  {uploading ? 'Uploadujem...' : 'Klikni za odabir fotografije'}
                </span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleUrlSave}>
              <div>
                <label style={labelStyle}>URL slike</label>
                <input required style={inputStyle} value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
              </div>
            </form>
          )}

          <div>
            <label style={labelStyle}>Kategorija</label>
            <select style={inputStyle} value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">— Bez kategorije</option>
              <option value="turniri">Turniri</option>
              <option value="treninzi">Treninzi</option>
              <option value="ekipa">Ekipa</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Alt tekst (SR)</label>
              <input style={inputStyle} value={altSr} onChange={e => setAltSr(e.target.value)} placeholder="Opis na srpskom" />
            </div>
            <div>
              <label style={labelStyle}>Alt tekst (EN)</label>
              <input style={inputStyle} value={altEn} onChange={e => setAltEn(e.target.value)} placeholder="Description in English" />
            </div>
          </div>

          {error && <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}

          {tab === 'url' && (
            <button
              type="button"
              onClick={handleUrlSave as unknown as React.MouseEventHandler}
              disabled={uploading || !url}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold uppercase cursor-pointer disabled:opacity-60"
              style={{ background: '#dfd344', color: '#202657', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
            >
              <Save size={14} />
              {uploading ? 'Čuvam...' : 'Sačuvaj'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [showAdd, setShowAdd] = useState(false);
  const supabase = createClient();

  const handleDelete = async (img: GalleryImage) => {
    if (!confirm('Obriši ovu fotografiju?')) return;
    // Try to remove from storage if it's a Supabase Storage URL
    if (img.url.includes('/storage/v1/object/public/gallery/')) {
      const path = img.url.split('/gallery/')[1];
      await supabase.storage.from('gallery').remove([path]);
    }
    await supabase.from('gallery_images').delete().eq('id', img.id);
    setImages(imgs => imgs.filter(i => i.id !== img.id));
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider cursor-pointer"
          style={{ background: '#dfd344', color: '#202657', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
        >
          <Plus size={16} /> Dodaj fotografiju
        </button>
      </div>

      {!images.length ? (
        <div
          className="rounded-2xl px-6 py-16 text-center cursor-pointer"
          style={{ background: '#1a2035', border: '2px dashed rgba(255,255,255,0.1)' }}
          onClick={() => setShowAdd(true)}
        >
          <Upload size={32} style={{ color: 'rgba(255,255,255,0.2)', margin: '0 auto 12px' }} />
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Nema fotografija. Dodaj prvu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden" style={{ background: '#1a2035' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt_sr ?? ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: 'rgba(15,20,33,0.7)' }}>
                <button
                  onClick={() => handleDelete(img)}
                  className="p-2.5 rounded-xl cursor-pointer transition-colors"
                  style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171' }}
                  aria-label="Obriši fotografiju"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {/* Add tile */}
          <button
            onClick={() => setShowAdd(true)}
            className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '2px dashed rgba(255,255,255,0.12)' }}
          >
            <Plus size={24} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>Dodaj</span>
          </button>
        </div>
      )}

      {showAdd && (
        <AddImageModal onAdd={img => setImages(imgs => [...imgs, img])} onClose={() => setShowAdd(false)} />
      )}
    </>
  );
}
