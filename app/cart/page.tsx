"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/components/cart-context'
import { useAuth } from '@/components/auth-context'
import { supabase } from '@/lib/supabase/client'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function CartPage() {
  const router = useRouter()
  const redirectedRef = useRef(false)
  const { user, isLoading } = useAuth()
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (!isLoading && !user && !redirectedRef.current) {
      redirectedRef.current = true
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  async function handlePlaceOrder() {
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsOrdering(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart, email: user.email }),
      })

      const data = await response.json()

      if (data.url) {
        localStorage.setItem("cart", JSON.stringify(cart))
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred while preparing checkout')
      setIsOrdering(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-2xl mx-auto text-center text-foreground/60">
            Loading...
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (!user) {
    return null
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-warm-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-warm-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              Thank You!
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Your order has been placed successfully. We will contact you via WhatsApp to confirm the details.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/profile/orders"
                className="inline-flex items-center gap-2 px-8 py-3 bg-warm-gold hover:bg-warm-gold/90 text-foreground rounded-lg font-light transition-colors"
              >
                View My Orders
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-light transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <Link
              href="/products"
              className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
              aria-label="Back to products"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
              Your Cart
            </h1>
          </div>

          {cart.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-serif text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you have not added any candles yet
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-6 bg-card rounded-2xl shadow-sm"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-serif font-medium text-foreground mt-1">
                          {item.name}
                        </h3>
                        <p className="text-primary font-semibold mt-1">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total (Desktop) */}
                    <div className="hidden md:flex flex-col items-end justify-center">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="text-xl font-semibold text-foreground">
                        ${Number((item.price * item.quantity) || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-2xl p-8 shadow-sm sticky top-32">
                  <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground/80">
                      <span>Subtotal</span>
                      <span>${Number(cartTotal || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground/80">
                      <span>Shipping</span>
                      <span className="text-primary">Free</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between text-xl font-semibold text-foreground">
                      <span>Total</span>
                      <span>${Number(cartTotal || 0).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isOrdering}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center gap-3 text-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-70 glow-effect"
                  >
                    {isOrdering ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    We will contact you via WhatsApp to confirm your order
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
