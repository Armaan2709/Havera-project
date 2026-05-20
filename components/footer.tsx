import Link from 'next/link'
import { Instagram, Facebook, Mail, MapPin, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-serif font-light text-gold mb-4">
              Havera
            </h3>
            <p className="text-ivory/60 leading-relaxed max-w-md font-light">
              Handcrafted candles made with love and care. Each candle is poured with 
              premium soy wax and infused with carefully selected fragrances to create 
              moments of warmth and tranquility in your home.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/havera1611?igsh=MTRqdHVjMmc1M3F1NA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gold/10 hover:bg-gold/20 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gold" />
              </a>
              <a
                href="https://www.facebook.com/share/1E2jncx5eA/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gold/10 hover:bg-gold/20 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gold" />
              </a>
              <a
                href="https://youtube.com/@havera1611?si=13QTZItjLWkQz9Vs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gold/10 hover:bg-gold/20 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-gold" />
              </a>
              <a
                href="mailto:havera1611@gmail.com"
                className="p-2 bg-gold/10 hover:bg-gold/20 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-light text-ivory mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-ivory/60 hover:text-gold transition-colors font-light">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ivory/60 hover:text-gold transition-colors font-light">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ivory/60 hover:text-gold transition-colors font-light">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/products?category=custom" className="text-ivory/60 hover:text-gold transition-colors font-light">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-light text-ivory mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-ivory/60 font-light">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>haveracandels1104@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-ivory/60 font-light">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Sydney NSW</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ivory/50 font-light">
            {new Date().getFullYear()} Havera Candles. All rights reserved.
          </p>
          <p className="text-sm text-ivory/50 font-light">
            Handcrafted with love
          </p>
        </div>
      </div>
    </footer>
  )
}
