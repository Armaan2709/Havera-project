'use client'

import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/components/auth-context'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

interface Order {
  id: string
  total_price: number
  status: string
  items: any[]
  created_at: string
}

export default function OrdersPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const redirectedRef = useRef(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user && !redirectedRef.current) {
      redirectedRef.current = true
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      setOrdersLoading(true)

      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        console.log("No user logged in");
        setOrdersLoading(false)
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });

      console.log("User:", user.email);
      console.log("Orders:", data);
      console.log("Error:", error);

      if (error) {
        console.error(error);
        setOrdersLoading(false)
        return;
      }

      if (!data || data.length === 0) {
        setOrders([]);
        setOrdersLoading(false)
        return;
      }

      setOrders(data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setOrdersLoading(false)
    }
  }

  if (isLoading || ordersLoading) {
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
        <h1 className="text-4xl font-light text-foreground mb-8">My Orders</h1>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/70 mb-4">You haven't placed any orders yet.</p>
            <a href="/products" className="text-warm-gold hover:underline">
              Start shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-secondary/40 border border-border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <p className="text-foreground/70 text-sm">Order ID: {order.id.slice(0, 8)}</p>
                    <p className="text-foreground/70 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-light text-foreground">${Number(order.total_price || 0).toFixed(2)}</p>
                    <p className={`text-sm font-light capitalize ${
                      order.status === 'completed' ? 'text-green-600' :
                      order.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="text-foreground font-light mb-3">Items:</h4>
                  <ul className="space-y-2">
                    {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                      <li key={idx} className="text-foreground/70 text-sm">
                        {item.name} x {item.quantity} - ${Number((item.price * item.quantity) || 0).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
