'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@/components/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutGrid, Package, ShoppingCart, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAdmin, isLoading, signOut } = useAuth()
  const router = useRouter()
  const redirectedRef = useRef(false)

  useEffect(() => {
    if (!isLoading && !redirectedRef.current) {
      if (!user) {
        redirectedRef.current = true
        router.push('/auth/login')
      } else if (!isAdmin) {
        redirectedRef.current = true
        router.push('/')
      }
    }
  }, [user, isAdmin, isLoading, router])

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-[#F5F1E8]/60 tracking-widest uppercase font-light animate-pulse">
          Verifying Admin Access...
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#F5F1E8]">
      <div className="flex flex-1 w-full relative">
        {/* Dynamic Sidebar Overlay style */}
        <div className="w-64 bg-[#0B0B0B] border-r border-[#D4AF37]/20 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-[60]">
          <div className="p-8">
            <Link href="/admin" className="block text-center border-b border-[#D4AF37]/20 pb-6 mb-8 group">
              <h1 className="text-3xl font-serif font-light text-[#F5F1E8] tracking-wider group-hover:text-[#D4AF37] transition-colors">
                Havera <span className="text-[#D4AF37] group-hover:text-[#F5F1E8] transition-colors">Admin</span>
              </h1>
            </Link>
            <nav className="space-y-4">
              <Link
                href="/admin"
                className="group flex items-center gap-4 px-4 py-3 rounded-lg text-[#F5F1E8]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all border border-transparent hover:border-[#D4AF37]/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)]"
              >
                <LayoutGrid className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-light tracking-wide text-lg">Dashboard</span>
              </Link>
              <Link
                href="/admin/products"
                className="group flex items-center gap-4 px-4 py-3 rounded-lg text-[#F5F1E8]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all border border-transparent hover:border-[#D4AF37]/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)]"
              >
                <Package className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-light tracking-wide text-lg">Products</span>
              </Link>
              <Link
                href="/admin/orders"
                className="group flex items-center gap-4 px-4 py-3 rounded-lg text-[#F5F1E8]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all border border-transparent hover:border-[#D4AF37]/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)]"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-light tracking-wide text-lg">Orders</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 relative z-10 w-full">
          {/* Topbar */}
          <header className="fixed top-0 right-0 z-50 h-20 border-b border-[#D4AF37]/10 bg-[#0B0B0B]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" style={{ width: 'calc(100% - 16rem)' }}>
            <div className="text-[#F5F1E8]/60 font-light text-lg tracking-wide">
              Welcome back, <span className="text-[#D4AF37] font-normal">{user.user_metadata?.full_name || user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#D4AF37]/50 bg-black hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-light tracking-wider text-sm uppercase">Logout</span>
            </button>
          </header>

          {/* Page Content */}
          <main className="flex-1 relative z-10 pt-24 px-6 md:px-10 pb-48 bg-[#0B0B0B]">
            {/* Subtle Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.02)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      <footer className="w-full py-6 border-t border-[#D4AF37]/10 bg-[#0B0B0B] text-center text-[#F5F1E8]/40 text-sm font-light">
        <p>&copy; {new Date().getFullYear()} Havera Admin. All rights reserved.</p>
      </footer>
    </div>
  )
}
