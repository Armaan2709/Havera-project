# 🕯️ Havera – Premium Handcrafted Candles Store

Havera is an elegant, modern, and visually stunning e-commerce storefront dedicated to premium, handcrafted candles. Designed with sophisticated aesthetics, rich typography, and seamless transitions, Havera offers an exquisite shopping experience for scented, decorative, festive, and custom candles.

Built with cutting-edge technologies like **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Supabase**, and **Stripe**, Havera represents a state-of-the-art e-commerce solution with high visual excellence and absolute performance.

---

## ✨ Features

- **🛍️ Elegant Storefront**: Minimalist and luxurious UI inspired by high-end boutique aesthetics. Fully responsive design utilizing glassmorphism and gold accents.
- **🕯️ Diverse Collections**: Organized categories for **Scented**, **Decorative**, **Festive**, and **Custom** candles.
- **🛒 Interactive Cart System**: Localized & database-synced cart context for seamless shopping.
- **🔐 Secure Authentication**: Integrated authentication with Supabase (email/password signup, login, and sessions).
- **💳 Stripe Checkout**: Secure credit card payments via Stripe integration.
- **👤 Customer Profiles**: Dedicated user dashboard to view order history, update shipping details, and manage profiles.
- **📊 Admin Dashboard**: Full control panel for managing products, reviewing sales analytics, and tracking pending orders.
- **🚀 Advanced Tech Stack**: Ultra-fast server rendering, next-gen styling with Tailwind CSS v4, and typesafe architecture.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Backend-as-a-Service**: [Supabase](https://supabase.com/) (PostgreSQL database, Auth, Storage)
- **Payment Gateway**: [Stripe](https://stripe.com/)
- **State & Forms**: React Hook Form, Zod (validation), Context API
- **Icons & Visuals**: [Lucide React](https://lucide.dev/), Unsplash high-resolution imagery

---

## 🚀 Quick Start

Follow these steps to run Havera locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.x or later) and `npm` or `pnpm` installed.

### 2. Clone the Repository
```bash
git clone https://github.com/Armaan2709/Havera-project.git
cd Havera-project
```

### 3. Install Dependencies
Using npm:
```bash
npm install
```
Or using pnpm:
```bash
pnpm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Supabase and Stripe API keys (you can copy `.env.example` as a template):
```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 5. Run the Development Server
```bash
npm run dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

---

## 📦 Building for Production

To create an optimized production build of the project, run:
```bash
npm run build
```
To run the built application:
```bash
npm run start
```

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (pages & api routes)
│   ├── about/            # About page
│   ├── account/          # Customer account management
│   ├── admin/            # Admin control panel and statistics
│   ├── api/              # API routes (Stripe webhooks & checkouts)
│   ├── auth/             # Authentication screens (Login, Signup, Reset)
│   ├── cart/             # Shopping cart page
│   ├── contact/          # Contact page and customer support details
│   ├── orders/           # User order tracking
│   ├── products/         # Product catalog and dynamic details
│   ├── success/          # Stripe checkout success landing page
│   └── globals.css       # Main styles & Tailwind directives
├── components/           # Reusable UI & Layout Components
│   ├── home/             # Hero, Featured, Testimonials, Categories sections
│   ├── ui/               # Core design system components (buttons, inputs, dialogs)
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utilities (Supabase client, Stripe configurations)
├── public/               # Static assets (images, logos, fonts)
├── .env.example          # Template for environment variables
└── next.config.mjs       # Next.js bundler configuration
```

---

## 🔒 Security Note
Never commit your `.env.local` or any production secrets to GitHub. The repository is pre-configured with a `.gitignore` to prevent credentials from being exposed.

---

## 🤝 Contributing
Contributions are welcome! If you'd like to improve the codebase:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is private and proprietary. All rights reserved. Developed for **Havera**.
