"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ShoppingBag, Clock, Sparkles, Minus, Plus } from 'lucide-react'
import { useCart, type Product } from './cart-context'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, cart, updateQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  // Check if product is already in cart
  const cartItem = cart.find(item => item.id === product.id)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleAddToCart = () => {
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setTimeout(() => {
      setIsAdding(false)
      onClose()
    }, 500)
  }

  const handleUpdateCart = () => {
    if (cartItem) {
      updateQuantity(product.id, quantity)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <Image
              src={product.image_url || '/placeholder-candle.jpg'}
              alt={product.name}
              fill
              className="object-cover"
            />
            {/* Warm Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-warm-gold/10 via-transparent to-transparent" />
            
            {/* Floating Glow Effect */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-32 bg-warm-gold/30 rounded-full blur-3xl" />
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-10 flex flex-col justify-center overflow-y-auto max-h-[60vh] md:max-h-none">
            <span className="text-sm text-primary uppercase tracking-widest font-medium">
              {product.category}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mt-2 mb-4">
              {product.name}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Details */}
            {product.burn_time && (
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-foreground/80">
                <Clock className="w-5 h-5 text-warm-gold" />
                <span className="text-sm">
                  <span className="font-medium">Burn Time:</span> {product.burn_time}
                </span>
              </div>
            </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-light text-warm-gold">
                ${product.price.toFixed(2)}
              </span>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={cartItem ? handleUpdateCart : handleAddToCart}
              disabled={isAdding}
              className="w-full py-4 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black rounded-lg flex items-center justify-center gap-3 text-lg font-light transition-all disabled:opacity-70 border-2 border-[#D4AF37]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>
                {isAdding ? 'Adding...' : cartItem ? 'Update Cart' : 'Add to Cart'}
              </span>
            </button>

            {cartItem && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Currently {cartItem.quantity} in your cart
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
