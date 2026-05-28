import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import MessagesClient from './MessagesClient';

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1
            className="text-white text-3xl font-black uppercase"
            style={{ fontFamily: 'var(--font-barlow-condensed), "Barlow Condensed", sans-serif' }}
          >
            Kontakt poruke
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            {messages?.filter(m => !m.read).length ?? 0} nepročitanih
          </p>
        </div>
        <MessagesClient initialMessages={messages ?? []} />
      </div>
    </AdminShell>
  );
}
