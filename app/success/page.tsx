"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useCart } from '@/components/cart-context'
import { ShoppingBag } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const verified = useRef(false)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      setStatus('error')
      return
    }

    const verifyPayment = async () => {
      if (verified.current) return
      verified.current = true

      try {
        const localCart = localStorage.getItem("cart") || "[]"

        const res = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            session_id: sessionId,
            cart: localCart 
          })
        })

        if (res.ok) {
          setStatus('success')
          clearCart()
          localStorage.removeItem("cart")
        } else {
          setStatus('error')
        }
      } catch (err) {
        console.error('Verification failed', err)
        setStatus('error')
      }
    }

    verifyPayment()
  }, [searchParams, router, clearCart])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center w-full">
          {status === 'loading' && (
            <div className="text-foreground/60 text-lg">Verifying your payment...</div>
          )}
          
          {status === 'error' && (
            <div className="text-destructive text-lg">
              There was an issue verifying your payment. Please contact support.
            </div>
          )}

          {status === 'success' && (
            <>
              <div className="w-20 h-20 bg-warm-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-10 h-10 text-warm-gold" />
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
                Payment Successful 🎉
              </h1>
              <p className="text-lg text-foreground/70 mb-8">
                Your order has been saved successfully. Thank you for shopping with Havera!
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
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
