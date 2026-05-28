'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Pogrešan email ili lozinka.');
      setLoading(false);
      return;
    }
    router.push('/admin/dashboard');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        className="rounded-2xl p-6 space-y-4"
        style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Email */}
        <div>
          <label
            htmlFor="admin-email"
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
          >
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
            style={{ background: '#0f1421', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            onFocus={e => (e.target.style.borderColor = '#dfd344')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="admin-password"
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
          >
            Lozinka
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPass ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 pr-11 text-white text-sm focus:outline-none transition-colors"
              style={{ background: '#0f1421', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              onFocus={e => (e.target.style.borderColor = '#dfd344')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              aria-label={showPass ? 'Sakrij lozinku' : 'Prikaži lozinku'}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-widest transition-opacity cursor-pointer disabled:opacity-60"
          style={{ background: '#dfd344', color: '#202657', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
        >
          <LogIn size={16} />
          {loading ? 'Prijavljujem...' : 'Prijavi se'}
        </button>
      </div>
    </form>
  );
}
