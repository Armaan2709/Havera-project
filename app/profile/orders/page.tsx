"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-context'
import { supabase } from '@/lib/supabase/client'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ProfileOrdersPage() {
  const { user, isLoading } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders()
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  async function fetchOrders(retryCount = 0) {
    try {
      if (retryCount === 0) setLoading(true)

      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        console.log("User not logged in");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_email', user.email)
        .order('created_at', { ascending: false });

      console.log("User email:", user.email);
      console.log("Orders:", data);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if ((!data || data.length === 0) && retryCount < 1) {
        setTimeout(() => {
          fetchOrders(1)
        }, 2000)
        return
      }

      setOrders(data || [])
    } catch (err: any) {
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 px-6 text-center text-foreground/60">Loading orders...</div>
        <Footer />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 px-6 text-center text-foreground/60">Please log in to view orders.</div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-32">
        <h1 className="text-4xl font-light text-foreground mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 text-foreground/70">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-secondary/40 border border-border rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <p className="text-foreground/70 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-light text-foreground">${Number(order.total || 0).toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="text-foreground font-light mb-3">Products:</h4>
                  <div className="space-y-4">
                    {(() => {
                      const items = typeof order.products === "string" 
                        ? JSON.parse(order.products) 
                        : order.products;
                        
                      return items?.map((item: any, index: number) => (
                        <div key={index} className="text-foreground/70 text-sm">
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p>Qty: {item.quantity}</p>
                          <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
