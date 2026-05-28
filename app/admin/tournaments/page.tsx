import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import TournamentsClient from './TournamentsClient';

export default async function TournamentsPage() {
  const supabase = await createClient();
  const { data: tournaments } = await supabase
    .from('tournaments')
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
            Turniri & Događaji
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            {tournaments?.filter(t => t.active).length ?? 0} aktivnih
          </p>
        </div>
        <TournamentsClient initialTournaments={tournaments ?? []} />
      </div>
    </AdminShell>
  );
}
