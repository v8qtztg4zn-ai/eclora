# ECLORA — Lab-Grown Diamond Luxury

> **Not mined, but designed to shine.**

A premium full-stack jewelry brand website with an admin ERP dashboard. Built for ECLORA — modern lab-grown diamond luxury for a conscious generation.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion, GSAP-ready |
| 3D Background | React Three Fiber, Three.js |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (HTTP-only cookies) |
| Charts | Recharts |

## Features

### Public Website
- Cinematic hero with 3D diamond particles
- Scroll-driven storytelling with parallax
- Collection showcase with glassmorphism cards
- Product listing & detail pages with wishlist
- Custom jewelry inquiry form with image upload
- About & sustainability sections
- Contact page with appointment booking & WhatsApp CTA

### Admin ERP Dashboard (`/admin`)
- Overview with stats, sales chart, recent activity
- Product management (CRUD, images, specs, featured)
- Inquiry management with status workflow
- Order management with delivery tracking
- Customer profiles with history
- Appointment scheduling
- Analytics with conversion metrics
- Site settings (brand, contact, social links)

## Prerequisites

- **Node.js** 18+ and npm
- **Docker** (for PostgreSQL) or a hosted PostgreSQL instance
- **Git** (optional)

## Quick Start

### 1. Clone & Install

```bash
cd Projects/eclora
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL="postgresql://eclora:eclora_secret@localhost:5432/eclora?schema=public"
JWT_SECRET="your-long-random-secret-here"
ADMIN_EMAIL="admin@eclora.com"
ADMIN_PASSWORD="EcloraAdmin2024!"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="1234567890"
```

### 3. Start PostgreSQL

```bash
docker compose up -d
```

### 4. Database Setup

```bash
npm run db:push
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the website.

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

**Default admin credentials:**
- Email: `admin@eclora.com`
- Password: `EcloraAdmin2024!`

## Project Structure

```
eclora/
├── prisma/
│   ├── schema.prisma      # Database models
│   └── seed.ts            # Sample data
├── public/
│   └── uploads/           # Uploaded images
├── src/
│   ├── app/
│   │   ├── (site)/        # Public pages
│   │   ├── admin/         # Admin dashboard
│   │   └── api/           # REST API routes
│   ├── components/
│   │   ├── admin/         # Dashboard components
│   │   ├── forms/         # Inquiry & appointment forms
│   │   ├── home/          # Homepage sections
│   │   ├── layout/        # Navbar, Footer
│   │   ├── products/      # Product cards
│   │   ├── three/         # 3D diamond scene
│   │   └── ui/            # Reusable UI primitives
│   ├── lib/               # Auth, Prisma, utils, validation
│   └── types/             # TypeScript interfaces
├── docker-compose.yml
└── README.md
```

## API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Admin login |
| POST | `/api/auth/logout` | — | Admin logout |
| GET | `/api/products` | — | List products |
| POST | `/api/products` | Admin | Create product |
| GET/PUT/DELETE | `/api/products/[id]` | Mixed | Product CRUD |
| POST | `/api/inquiries` | — | Submit inquiry |
| GET/PUT | `/api/inquiries/[id]` | Admin | Manage inquiry |
| GET/POST | `/api/orders` | Mixed | Orders |
| GET/PUT | `/api/orders/[id]` | Admin | Update order |
| GET | `/api/customers` | Admin | List customers |
| POST | `/api/appointments` | — | Book appointment |
| POST | `/api/wishlist` | — | Toggle wishlist |
| POST | `/api/upload` | Admin | Upload image |
| GET/PUT | `/api/settings` | Mixed | Site settings |
| GET | `/api/dashboard` | Admin | Dashboard stats |
| GET | `/api/analytics` | Admin | Analytics data |

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Midnight | `#050505` | Background |
| Champagne | `#D6B56D` | Primary accent |
| Ivory | `#F7F1E5` | Text |
| Rose | `#E8B7C8` | Secondary accent |
| Silver | `#C9CDD3` | Muted text |
| Emerald | `#0E6B5C` | Sustainability |

Typography: **Cormorant Garamond** (display) + **Outfit** (body)

## Production Build

```bash
npm run build
npm start
```

For production, use a managed PostgreSQL service (Neon, Supabase, RDS) and set strong `JWT_SECRET` and `ADMIN_PASSWORD` values.

## License

Private — ECLORA Brand. All rights reserved.
