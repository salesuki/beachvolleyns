import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import TeamsClient from './TeamsClient';

export default async function TeamsPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1
            className="text-white text-3xl font-black uppercase"
            style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
          >
            Ekipe
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            Upravljanje igračima i trenerima
          </p>
        </div>
        <TeamsClient initialMembers={members ?? []} />
      </div>
    </AdminShell>
  );
}
