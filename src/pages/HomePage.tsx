import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { EditorialHero } from '@/components/EditorialHero';
import { GallerySection } from '@/components/GallerySection';
import { ServicesSection } from '@/components/ServicesSection';
import { StoryCTASection } from '@/components/StoryCTASection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';

export function HomePage() {
  return (
    <>
      <EditorialHero />
      <AboutSection />
      <ServicesSection />
      <StoryCTASection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
