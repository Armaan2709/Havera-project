"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { useCart } from '@/components/cart-context'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/components/cart-context'

export function FeaturedSection() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .limit(4)

      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const featuredProducts = products

  return (
    <section className="py-24 px-5 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-widest uppercase font-light">
            Bestsellers
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-ivory mt-4 mb-6 text-balance">
            Featured Candles
          </h2>
          <p className="text-ivory/60 text-lg max-w-2xl mx-auto text-balance font-light">
            Discover our most loved creations, handpicked for their exceptional fragrances and timeless elegance.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-black/40 border border-gold/20 rounded-lg aspect-square animate-pulse" />
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-black/40 border border-gold/20 rounded-lg overflow-hidden hover:border-gold/50 transition-all duration-500 hover:shadow-lg hover:shadow-gold/20"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-black">
                <Image
                  src={product.image_url || '/placeholder-candle.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gold Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Quick Add Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#D4AF37] text-black rounded-lg flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#D4AF37]/90 font-light border border-[#D4AF37]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm">Add to Cart</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <span className="text-xs text-ivory/50 uppercase tracking-wider font-light">
                  {product.category}
                </span>
                <h3 className="text-xl font-serif font-light text-ivory mt-2 mb-2">
                  {product.name}
                </h3>
                <p className="text-gold font-light text-lg">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors text-lg font-light border-2 border-[#D4AF37] px-8 py-3 rounded-lg hover:bg-[#D4AF37] hover:text-black"
          >
            View All Products
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
