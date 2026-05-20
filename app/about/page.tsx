import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Heart, Leaf, Sparkles, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-warm-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pastel-pink/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-primary text-sm tracking-widest uppercase font-medium">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-foreground mt-4 mb-8 text-balance">
            Crafting Warmth, One Candle at a Time
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-balance">
            What began as a passion project in a small kitchen has blossomed into a beloved brand, 
            bringing handcrafted warmth and light into homes around the world.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gold/10 group">
                <Image
                  src="https://nestasia.in/cdn/shop/files/aromatic-set-of-4-festive-delights-gold-candles.jpg?v=1724148891&width=800"
                  alt="Handcrafted festive gold candles set"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-warm-gold/20 rounded-full blur-2xl" />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">
                The Beginning
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Havera Candles was born from a simple love of creating beautiful things that bring 
                  comfort to everyday moments. In 2018, our founder started experimenting with different 
                  wax blends and fragrances in her home kitchen, driven by a desire to create candles 
                  that were both beautiful and safe for her family.
                </p>
                <p>
                  What started as gifts for friends and family quickly grew into something more. 
                  The positive response was overwhelming, and Havera Candles officially launched 
                  with a mission to bring handcrafted luxury into every home.
                </p>
                <p>
                  Today, every candle is still made by hand in small batches, ensuring the same 
                  quality and care that started this journey. We believe that the best things in 
                  life are made with love, patience, and attention to detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm tracking-widest uppercase font-medium">
              What We Believe
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-semibold text-foreground mt-4 text-balance">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Made with Love',
                description: 'Every candle carries our passion and dedication to creating moments of joy.',
              },
              {
                icon: Leaf,
                title: 'Sustainable',
                description: 'We use eco-friendly materials and sustainable practices in everything we do.',
              },
              {
                icon: Sparkles,
                title: 'Quality First',
                description: 'Premium ingredients and meticulous craftsmanship in every single candle.',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building connections and spreading warmth through our shared love of candles.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-medium text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="text-primary text-sm tracking-widest uppercase font-medium">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mt-4 mb-8">
                From Inspiration to Ignition
              </h2>
              <div className="space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Sourcing',
                    description: 'We carefully select premium soy wax, cotton wicks, and the finest fragrance oils.',
                  },
                  {
                    step: '02',
                    title: 'Crafting',
                    description: 'Each candle is hand-poured in small batches to ensure consistent quality.',
                  },
                  {
                    step: '03',
                    title: 'Curing',
                    description: 'Our candles cure for at least two weeks to develop their full fragrance potential.',
                  },
                  {
                    step: '04',
                    title: 'Quality Check',
                    description: 'Every candle is inspected before being packaged and sent to you.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <span className="text-3xl font-serif font-light text-primary/50">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=800&fit=crop"
                  alt="Candle making process"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-pastel-pink/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6 text-balance">
            Ready to Experience Havera?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Discover our collection of handcrafted candles and bring warmth into your home.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-colors glow-effect"
          >
            Shop Our Collection
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
