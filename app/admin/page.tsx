'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Package, ShoppingBag, DollarSign, Clock } from 'lucide-react'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
}

interface RecentOrder {
  id: string
  created_at: string
  total_price: number
  status: string
  customer_email: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatsAndOrders()
  }, [])

  async function fetchStatsAndOrders() {
    try {
      setLoading(true)

      // Total Products
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      // Orders
      const { data: orders } = await supabase
        .from('orders')
        .select('total_price, status')

      const totalOrders = orders?.length || 0
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_price || 0), 0) || 0
      const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0

      setStats({
        totalProducts: productCount || 0,
        totalOrders,
        totalRevenue,
        pendingOrders,
      })

      // Recent Orders (Last 5)
      const { data: recent } = await supabase
        .from('orders')
        .select('id, created_at, total_price, status, customer_email')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentOrders(recent || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-light text-[#F5F1E8] mb-2">Overview</h1>
        <p className="text-[#F5F1E8]/50 font-light tracking-wide">Monitor your luxury candle sales and catalog.</p>
      </div>

      {loading ? (
        <div className="text-[#D4AF37] font-light animate-pulse tracking-widest uppercase">Loading Dashboard Data...</div>
      ) : stats ? (
        <>
          {/* Top Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<Package className="text-[#D4AF37] w-6 h-6" />}
              title="Total Products"
              value={stats.totalProducts}
              subtitle="Active in inventory"
            />
            <StatCard
              icon={<ShoppingBag className="text-[#D4AF37] w-6 h-6" />}
              title="Total Orders"
              value={stats.totalOrders}
              subtitle="All time requests"
            />
            <StatCard
              icon={<DollarSign className="text-[#D4AF37] w-6 h-6" />}
              title="Total Revenue"
              value={`$${Number(stats.totalRevenue || 0).toFixed(2)}`}
              subtitle="All time revenue"
            />
            <StatCard
              icon={<Clock className="text-[#D4AF37] w-6 h-6" />}
              title="Pending Orders"
              value={stats.pendingOrders}
              subtitle="Awaiting fulfillment"
            />
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-[#0B0B0B] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="px-8 py-6 border-b border-[#D4AF37]/20 bg-[#D4AF37]/5">
              <h2 className="text-xl font-serif font-light text-[#F5F1E8]">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D4AF37]/10 bg-black/40">
                    <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Order ID</th>
                    <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Customer Email</th>
                    <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Amount</th>
                    <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Date</th>
                    <th className="px-8 py-4 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/5 transition-colors group">
                      <td className="px-8 py-5 text-[#F5F1E8] font-mono text-sm opacity-80 group-hover:text-[#D4AF37] transition-colors">{order.id.slice(0, 8)}</td>
                      <td className="px-8 py-5 text-[#F5F1E8] font-light">{order.customer_email || 'Guest'}</td>
                      <td className="px-8 py-5 text-[#D4AF37] font-light">${Number(order.total_price || 0).toFixed(2)}</td>
                      <td className="px-8 py-5 text-[#F5F1E8]/60 font-light text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded text-xs tracking-wider uppercase border ${
                          order.status === 'completed' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                          order.status === 'pending' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                          'border-red-500/30 text-red-400 bg-red-500/10'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-8 text-center text-[#F5F1E8]/40 font-light italic">
                        No orders have been placed yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle: string
}) {
  return (
    <div className="group bg-[#0B0B0B] border border-[#D4AF37]/20 rounded-xl p-8 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
        {icon}
      </div>
      <p className="text-[#F5F1E8]/60 text-sm font-light tracking-wide uppercase mb-3">{title}</p>
      <p className="text-4xl font-serif font-light text-[#D4AF37] mb-2 group-hover:scale-105 origin-left transition-transform">{value}</p>
      <p className="text-[#F5F1E8]/40 text-sm font-light">{subtitle}</p>
    </div>
  )
}
