import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    id: 'scented',
    name: 'Scented Candles',
    description: 'Aromatic blends to fill your space',
    image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800&h=600&fit=crop',
  },
  {
    id: 'decorative',
    name: 'Decorative Candles',
    description: 'Art pieces that illuminate',
    image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=800&h=600&fit=crop',
  },
  {
    id: 'festive',
    name: 'Festive Candles',
    description: 'Celebrate special moments',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&h=600&fit=crop',
  },
  {
    id: 'custom',
    name: 'Custom Candles',
    description: 'Personalized just for you',
    image: 'https://images.unsplash.com/photo-1602523961358-f9f03af85ed5?w=800&h=600&fit=crop',
  },
]

export function CategoriesSection() {
  return (
    <section className="py-24 px-5 sm:px-6 bg-beige">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-black text-sm tracking-widest uppercase font-light">
            Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-black mt-4 mb-6 text-balance">
            Shop by Category
          </h2>
          <p className="text-black/70 text-lg max-w-2xl mx-auto text-balance font-light">
            Find the perfect candle for every mood and occasion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative aspect-[4/5] rounded-lg overflow-hidden border border-black/10 hover:border-gold transition-all">
            <Link
              href={`/products?category=${category.id}`}
              className="absolute inset-0 flex flex-col"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Gold Glow on Hover */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
                <h3 className="text-2xl font-serif font-light mb-2">
                  {category.name}
                </h3>
                <p className="text-ivory/70 text-sm font-light">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-light opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
