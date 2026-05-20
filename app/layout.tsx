import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { AuthProvider } from '@/components/auth-context'
import { Toaster } from 'sonner'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'Havera Candles | Handcrafted with Love',
  description: 'Light up your moments with Havera Candles. Discover our collection of handcrafted, eco-friendly candles made with love and premium ingredients.',
  keywords: ['candles', 'handmade candles', 'scented candles', 'eco-friendly candles', 'luxury candles'],
  openGraph: {
    title: 'Havera Candles',
    description: 'Handcrafted, eco-friendly candles made with love',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${lato.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}
