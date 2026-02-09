import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import ServicesBento from '@/components/ui/ServicesBento';
import MethodSection from '@/components/ui/MethodSection';
import TrustBar from '@/components/ui/TrustBar';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className="main-container">
      <Navbar />
      <Hero />
      <TrustBar />
      <ServicesBento />
      <MethodSection />
      <Footer />
    </main>
  );
}
