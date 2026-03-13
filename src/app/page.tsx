import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import ServicesBento from '@/components/ui/ServicesBento';
import MethodSection from '@/components/ui/MethodSection';
import ReviewsSection from '@/components/ui/ReviewsSection';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className="main-container">
      <Navbar />
      <Hero />
      <ReviewsSection />
      <ServicesBento />
      <MethodSection />
      <Footer />
    </main>
  );
}
