import type { Product } from '@/components/cart-context'

export const products: Product[] = [
  {
    id: 1,
    name: "Vanilla Dreams",
    price: 28,
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=600&h=600&fit=crop",
    category: "scented",
    description: "A warm and comforting vanilla scent that fills your space with cozy warmth. Perfect for relaxing evenings at home.",
    fragrance: "Vanilla, Tonka Bean, Sandalwood",
    burnTime: "45+ hours"
  },
  {
    id: 2,
    name: "Lavender Serenity",
    price: 32,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop",
    category: "scented",
    description: "Calming lavender essence blended with hints of eucalyptus for the ultimate relaxation experience.",
    fragrance: "French Lavender, Eucalyptus, Chamomile",
    burnTime: "50+ hours"
  },
  {
    id: 3,
    name: "Rose Garden",
    price: 35,
    image: "https://images.unsplash.com/photo-1608181831718-2501c814828e?w=600&h=600&fit=crop",
    category: "scented",
    description: "Delicate rose petals captured in a beautiful handcrafted candle. Romance in every flicker.",
    fragrance: "Bulgarian Rose, Peony, White Musk",
    burnTime: "40+ hours"
  },
  {
    id: 4,
    name: "Golden Amber",
    price: 38,
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=600&fit=crop",
    category: "decorative",
    description: "Rich amber tones with a sophisticated golden glow. A statement piece for any room.",
    fragrance: "Amber, Oud, Bergamot",
    burnTime: "55+ hours"
  },
  {
    id: 5,
    name: "Winter Spice",
    price: 30,
    image: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=600&h=600&fit=crop",
    category: "festive",
    description: "Warm cinnamon and clove blend perfect for holiday gatherings and cozy winter nights.",
    fragrance: "Cinnamon, Clove, Orange Peel, Nutmeg",
    burnTime: "45+ hours"
  },
  {
    id: 6,
    name: "Midnight Jasmine",
    price: 34,
    image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=600&h=600&fit=crop",
    category: "scented",
    description: "Exotic jasmine blooms under moonlight, creating an enchanting atmosphere.",
    fragrance: "Jasmine, Ylang Ylang, Vanilla",
    burnTime: "48+ hours"
  },
  {
    id: 7,
    name: "Marble Elegance",
    price: 45,
    image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600&h=600&fit=crop",
    category: "decorative",
    description: "Stunning marble-effect decorative candle that doubles as an art piece.",
    fragrance: "Unscented",
    burnTime: "60+ hours"
  },
  {
    id: 8,
    name: "Holiday Glow",
    price: 36,
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=600&fit=crop",
    category: "festive",
    description: "Capture the magic of the holidays with pine, cranberry, and warm spices.",
    fragrance: "Pine Needle, Cranberry, Cinnamon",
    burnTime: "50+ hours"
  },
  {
    id: 9,
    name: "Custom Initials",
    price: 42,
    image: "https://images.unsplash.com/photo-1602523961358-f9f03af85ed5?w=600&h=600&fit=crop",
    category: "custom",
    description: "Personalized candle with your initials carved into premium soy wax. Perfect gift.",
    fragrance: "Choose Your Fragrance",
    burnTime: "45+ hours"
  },
  {
    id: 10,
    name: "Ocean Breeze",
    price: 29,
    image: "https://images.unsplash.com/photo-1631488509945-f6ea4b9d1f84?w=600&h=600&fit=crop",
    category: "scented",
    description: "Fresh sea salt and driftwood transport you to a peaceful coastal retreat.",
    fragrance: "Sea Salt, Driftwood, White Tea",
    burnTime: "42+ hours"
  },
  {
    id: 11,
    name: "Geometric Blush",
    price: 48,
    image: "https://images.unsplash.com/photo-1599446220374-5a2c79f7a0ef?w=600&h=600&fit=crop",
    category: "decorative",
    description: "Modern geometric design in soft blush tones. Contemporary elegance.",
    fragrance: "Rose, Peach, Vanilla",
    burnTime: "55+ hours"
  },
  {
    id: 12,
    name: "Wedding Favor Set",
    price: 65,
    image: "https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?w=600&h=600&fit=crop",
    category: "custom",
    description: "Set of 6 mini candles, customizable for weddings and special events.",
    fragrance: "Customizable",
    burnTime: "15+ hours each"
  }
]

export const categories = [
  { id: 'all', name: 'All Candles' },
  { id: 'scented', name: 'Scented Candles' },
  { id: 'decorative', name: 'Decorative Candles' },
  { id: 'festive', name: 'Festive Candles' },
  { id: 'custom', name: 'Custom Candles' }
]
