import { Leaf, Heart, Clock, Award } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Handmade with Love',
    description: 'Every candle is carefully crafted by hand, ensuring unique quality and attention to detail in each piece.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'We use 100% natural soy wax and sustainable materials, making our candles kind to the environment.',
  },
  {
    icon: Clock,
    title: 'Long-Lasting Fragrance',
    description: 'Premium fragrance oils provide a consistent, beautiful scent that fills your space for hours.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'From wax to wick, we source only the finest materials to create candles that exceed expectations.',
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest uppercase font-light">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-ivory mt-4 mb-6 text-balance">
            Why Choose Havera
          </h2>
          <p className="text-ivory/60 text-lg max-w-2xl mx-auto text-balance font-light">
            We pour our passion into every candle, creating moments of warmth and tranquility for your home
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-lg bg-black/40 border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-300">
                <feature.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-light text-ivory mb-4">
                {feature.title}
              </h3>
              <p className="text-ivory/60 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
