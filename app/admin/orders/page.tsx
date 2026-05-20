"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching all orders:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-[#D4AF37] animate-pulse">Loading orders...</div>
  }

  return (
    <div className="p-8 min-h-screen bg-[#050505]">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin" className="p-2 bg-[#1A1A1A] rounded hover:bg-[#2A2A2A] text-[#F5F1E8]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-serif text-[#F5F1E8]">Admin Orders Overview</h1>
      </div>

      <div className="bg-[#0B0B0B] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D4AF37]/10 bg-black/40">
                <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Customer Email</th>
                <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Total</th>
                <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Products Count</th>
                <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/5 transition-colors group">
                  <td className="px-8 py-5 text-[#F5F1E8] font-light">{order.user_email || 'N/A'}</td>
                  <td className="px-8 py-5 text-[#D4AF37] font-light">${Number(order.total || 0).toFixed(2)}</td>
                  <td className="px-8 py-5 text-[#F5F1E8]/80 font-light">
                    {Array.isArray(order.products) ? order.products.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0) : 0} items
                  </td>
                  <td className="px-8 py-5 text-[#F5F1E8]/60 font-light text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-8 text-center text-[#F5F1E8]/40 font-light italic">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
