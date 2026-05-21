"use client"

import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen lg:h-screen bg-black overflow-hidden flex items-center justify-center pt-28 pb-16 lg:py-0">
      {/* Solid Black Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle Glow Behind Candle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center px-5 sm:px-6 max-w-7xl mx-auto">
        
        {/* Left Side - Text Content */}
        <div className="flex-1 flex flex-col justify-center items-start lg:pr-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-ivory mb-6 leading-tight text-balance">
            More Than a Candle
            <span className="block text-gold">A Ritual</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-ivory/70 font-light mb-8 sm:mb-10 max-w-md sm:max-w-xl leading-relaxed">
            Handcrafted luxury candles designed to elevate your space. Each flame is a moment of pure indulgence.
          </p>

          <Link
            href="/products"
            className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 border-2 border-[#D4AF37] text-[#D4AF37] bg-transparent rounded-lg text-base sm:text-lg font-light hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group hover:shadow-lg hover:shadow-[#D4AF37]/50 text-center"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Side - Candle Image */}
        <div className="flex-1 flex items-center justify-center lg:pl-12 mt-8 sm:mt-12 lg:mt-0">
          <div className="relative w-full max-w-[280px] sm:max-w-sm">
            {/* Glow Effect Behind Image */}
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl scale-150" />
            
            {/* Candle Image */}
            <div className="relative z-5 aspect-square">
              <Image
                src="/hero-candle.jpg"
                alt="Luxury handcrafted candle"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-sm text-ivory/50 font-light">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
