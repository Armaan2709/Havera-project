'use client'

import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/components/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AccountPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const redirectedRef = useRef(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!isLoading && !user && !redirectedRef.current) {
      redirectedRef.current = true
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-light text-foreground mb-8">My Account</h1>

        <div className="bg-secondary/40 border border-border rounded-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-light text-foreground mb-4">Account Information</h2>
              <p className="text-foreground/70 mb-2">Email: {user.email}</p>
              <p className="text-foreground/70 mb-4">Member since: {new Date(user.created_at || '').toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-warm-gold hover:bg-warm-gold/90 text-foreground rounded-lg font-light transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-foreground/70 text-sm mb-4">
                To update your email or password, please use the links below.
              </p>
              <Link
                href="/auth/reset-password"
                className="inline-block px-4 py-2 bg-warm-gold hover:bg-warm-gold/90 text-foreground rounded-lg font-light transition-colors"
              >
                Change Password
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/profile/orders"
            className="block bg-secondary/40 border border-border rounded-lg p-6 hover:border-warm-gold transition-colors"
          >
            <h3 className="text-xl font-light text-foreground mb-2">My Orders</h3>
            <p className="text-foreground/70 text-sm">View and track your orders</p>
          </Link>

          <Link
            href="/"
            className="block bg-secondary/40 border border-border rounded-lg p-6 hover:border-warm-gold transition-colors"
          >
            <h3 className="text-xl font-light text-foreground mb-2">Continue Shopping</h3>
            <p className="text-foreground/70 text-sm">Browse our candle collection</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
