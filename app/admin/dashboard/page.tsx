import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import type { ContactSubmission } from '@/lib/supabase/types';
import { MessageSquare, Users, ImageIcon, Trophy } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: msgCount },
    { count: unreadCount },
    { count: teamsCount },
    { count: galleryCount },
    { count: tournamentsCount },
  ] = await Promise.all([
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('read', false),
    supabase.from('team_members').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('gallery_images').select('*', { count: 'exact', head: true }),
    supabase.from('tournaments').select('*', { count: 'exact', head: true }).eq('active', true),
  ]);

  const stats = [
    { label: 'Poruke', value: msgCount ?? 0, sub: `${unreadCount ?? 0} nepročitano`, icon: MessageSquare, href: '/admin/messages', color: '#1b7eb2' },
    { label: 'Članovi tima', value: teamsCount ?? 0, sub: 'aktivnih profila', icon: Users, href: '/admin/teams', color: '#3093cb' },
    { label: 'Slike u galeriji', value: galleryCount ?? 0, sub: 'fotografija', icon: ImageIcon, href: '/admin/gallery', color: '#dfd344' },
    { label: 'Turniri', value: tournamentsCount ?? 0, sub: 'aktivnih događaja', icon: Trophy, href: '/admin/tournaments', color: '#f2e554' },
  ];

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1
            className="text-white text-3xl font-black uppercase"
            style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
          >
            Dashboard
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            Pregled aktivnosti kluba
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, sub, icon: Icon, href, color }) => (
            <a
              key={label}
              href={href}
              className="rounded-2xl p-5 block transition-all duration-200 cursor-pointer hover:scale-105"
              style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${color}22`, color }}
              >
                <Icon size={18} />
              </div>
              <div
                className="text-3xl font-black"
                style={{ color: 'white', fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
              >
                {value}
              </div>
              <div
                className="text-xs font-bold uppercase tracking-wide mt-0.5"
                style={{ color, fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
              >
                {label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '2px' }}>
                {sub}
              </div>
            </a>
          ))}
        </div>

        {/* Recent messages */}
        <RecentMessages supabase={supabase} />
      </div>
    </AdminShell>
  );
}

async function RecentMessages({ supabase }: { supabase: Awaited<ReturnType<typeof createClient>> }) {
  const { data: messages }: { data: ContactSubmission[] | null } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#1a2035', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <h2
          className="text-white font-bold uppercase text-sm tracking-widest"
          style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
        >
          Nedavne poruke
        </h2>
        <a href="/admin/messages" style={{ color: '#dfd344', fontSize: '12px', fontWeight: 600 }}>
          Sve →
        </a>
      </div>
      {!messages?.length ? (
        <div className="px-5 py-8 text-center" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
          Još nema poruka.
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {messages.map(msg => (
            <div key={msg.id} className="px-5 py-4 flex items-start gap-3">
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: msg.read ? 'transparent' : '#dfd344', border: msg.read ? '1px solid rgba(255,255,255,0.2)' : 'none' }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-semibold text-sm">{msg.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{msg.email}</span>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', marginLeft: 'auto' }}>
                    {new Date(msg.created_at).toLocaleDateString('sr-RS')}
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
