import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import GalleryClient from './GalleryClient';

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from('gallery_images')
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
            Galerija
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            {images?.length ?? 0} fotografija
          </p>
        </div>
        <GalleryClient initialImages={images ?? []} />
      </div>
    </AdminShell>
  );
}
