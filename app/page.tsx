import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Training from '@/components/Training';
import Tournaments from '@/components/Tournaments';
import Teams from '@/components/Teams';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  const { data: galleryImages } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true })
    .limit(9);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Achievements />
        <Training />
        <Tournaments dbTournaments={tournaments ?? []} />
        <Teams />
        <Gallery dbImages={galleryImages ?? []} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
