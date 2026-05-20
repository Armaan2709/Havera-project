"use client"

import Image from 'next/image'
import { ShoppingBag, Eye } from 'lucide-react'
import { useCart, type Product } from './cart-context'

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="group relative bg-black/40 border border-gold/20 rounded-lg overflow-hidden hover:border-gold/50 transition-all duration-500 hover:shadow-lg hover:shadow-gold/20">
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
        
        {/* Action Buttons */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onViewDetails(product)}
            className="p-3 bg-black/80 backdrop-blur-sm text-gold rounded-full hover:bg-gold hover:text-black transition-colors"
            aria-label="View details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="px-5 py-3 bg-gold hover:bg-gold/90 text-black rounded-lg flex items-center gap-2 transition-colors font-light border border-gold"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <span className="text-xs text-ivory/50 uppercase tracking-wider font-light">
          {product.category}
        </span>
        <h3 className="text-lg font-light text-ivory mt-1 mb-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-gold font-light text-lg">
            ${product.price.toFixed(2)}
          </p>
          {product.burn_time && (
            <span className="text-xs text-ivory/40 font-light">
              {product.burn_time}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
