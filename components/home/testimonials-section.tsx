import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The Vanilla Dreams candle fills my entire living room with the most comforting scent. Absolutely love the quality!',
    rating: 5,
  },
  {
    name: 'Emily R.',
    text: 'I ordered custom candles for my wedding favors and they were perfect. The attention to detail is incredible.',
    rating: 5,
  },
  {
    name: 'Michael T.',
    text: 'Best candles I have ever purchased. The burn time is amazing and the fragrances are so authentic.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest uppercase font-light">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-ivory mt-4 mb-6 text-balance">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-black/40 border border-gold/20 p-8 rounded-lg hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-ivory/80 leading-relaxed mb-6 italic font-light">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <p className="text-gold font-light">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
