import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedSection } from '@/components/home/featured-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { WhyChooseUsSection } from '@/components/home/why-choose-us-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
