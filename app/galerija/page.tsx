import { createClient } from '@/lib/supabase/server';
import GalleryPageClient from './GalleryPageClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Galerija | NS Beach Volleyball Club',
  description: 'Fotografije sa turnira, treninga i događaja Kluba odbojke na pesku Novi Sad.',
};

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <>
      <Navbar />
      <GalleryPageClient images={images ?? []} />
      <Footer />
    </>
  );
}
