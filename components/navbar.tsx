"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, LogOut, Settings } from 'lucide-react'
import { useCart } from './cart-context'
import { useAuth } from './auth-context'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const { cartCount } = useCart()
  const { user, isAdmin, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-gold/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl sm:text-3xl font-serif font-light tracking-wider text-ivory">
              Havera
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ivory/70 hover:text-gold transition-colors duration-300 text-sm font-light tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart, Auth & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link
              href="/cart"
              className="relative p-2 hover:text-gold transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-ivory/70 group-hover:text-gold" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs rounded-full flex items-center justify-center font-light">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-2 h-auto">
                    <div className="w-8 h-8 rounded-full bg-warm-gold/20 flex items-center justify-center text-sm font-semibold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-light">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" className="font-light text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37] transition-all duration-300">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-light border-2 border-[#D4AF37] transition-all duration-300">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary/50 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/30 transition-colors text-lg font-light"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <>
                  <div className="px-6 py-3 border-t border-border">
                    <Link href="/auth/login" className="block mb-2">
                      <Button variant="outline" className="w-full font-light text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37] transition-all duration-300">Sign In</Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-light border-2 border-[#D4AF37] transition-all duration-300">Sign Up</Button>
                    </Link>
                  </div>
                </>
              )}
              {user && (
                <>
                  <div className="px-6 py-3 border-t border-border">
                    <Link href="/account" className="block px-3 py-2 hover:bg-secondary/30 rounded text-foreground/80 mb-2">
                      My Account
                    </Link>
                    <Link href="/profile/orders" className="block px-3 py-2 hover:bg-secondary/30 rounded text-foreground/80 mb-2">
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className="block px-3 py-2 hover:bg-secondary/30 rounded text-foreground/80 mb-2">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-destructive/10 rounded text-destructive font-light"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
