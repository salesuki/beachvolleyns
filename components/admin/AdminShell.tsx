'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard, MessageSquare, Users, ImageIcon,
  Trophy, Menu, X, LogOut, ExternalLink,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/messages', label: 'Poruke', icon: MessageSquare },
  { href: '/admin/teams', label: 'Ekipe', icon: Users },
  { href: '/admin/gallery', label: 'Galerija', icon: ImageIcon },
  { href: '/admin/tournaments', label: 'Turniri', icon: Trophy },
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="relative w-9 h-9 flex-shrink-0">
          <Image src="/logo.svg" alt="NS BVC" fill className="object-contain" />
        </div>
        <div>
          <div
            className="text-white font-black text-sm uppercase leading-tight"
            style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
          >
            NS Beach<br />Volleyball
          </div>
          <div className="text-xs mt-0.5" style={{ color: '#dfd344' }}>Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 cursor-pointer"
              style={{
                background: active ? 'rgba(223,211,68,0.12)' : 'transparent',
                color: active ? '#dfd344' : 'rgba(255,255,255,0.55)',
                borderLeft: active ? '2px solid #dfd344' : '2px solid transparent',
              }}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <ExternalLink size={16} />
          Pogledaj sajt
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 cursor-pointer text-left"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <LogOut size={16} />
          Odjavi se
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0f1421' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 flex-shrink-0"
        style={{ background: '#131929', borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="relative z-50 flex flex-col w-56"
            style={{ background: '#131929', borderRight: '1px solid rgba(255,255,255,0.07)' }}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-4 lg:px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#131929' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <span
              className="text-white/40 text-xs uppercase tracking-widest font-bold"
              style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
            >
              {navItems.find(n => n.href === pathname)?.label ?? 'Admin'}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
