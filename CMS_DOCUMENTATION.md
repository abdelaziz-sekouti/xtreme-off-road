# Xtreme Off-Road CMS & Project Documentation

This document gathers all necessary information about the Xtreme Off-Road 4x4 Tanger website and custom CMS (Admin Panel) built so far. Use this as a reference to continue development.

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MySQL (via `mysql2` raw queries)
- **Authentication:** NextAuth.js v4 (Credentials Provider)
- **Icons & UI:** Lucide React, Framer Motion (Animations), Embla Carousel

---

## 📂 Project Structure
```text
src/
├── app/
│   ├── admin/             # CMS Protected Routes
│   │   ├── layout.tsx     # Admin sidebar & NextAuth session wrapper
│   │   ├── page.tsx       # Admin Dashboard stats
│   │   ├── packages/      # Packages CRUD interface
│   │   └── settings/      # Dynamic theme & company info form
│   ├── api/auth/          # NextAuth endpoints (route.ts)
│   ├── actions/           # Next.js Server Actions (Database queries)
│   │   ├── packages.ts    # Server actions for packages
│   │   └── settings.ts    # Server actions for site settings
│   ├── globals.css        # Tailwind variables (overridden by DB)
│   ├── layout.tsx         # Public layout, injects dynamic theme from DB
│   └── page.tsx           # Public Homepage
├── components/
│   ├── layout/            # Navbar (Drawers) & Footer
│   ├── ui/                # ScrollToTop, WhatsAppButton, Custom Icons
│   └── home/              # Hero Carousel
└── lib/
    ├── db.ts              # MySQL connection pool
    ├── init-db.ts         # Database table creation script
    └── auth.ts            # NextAuth Configuration
```

---

## 🗄️ Database Schema & Architecture
We bypass Prisma due to environment configuration limits, relying on direct `mysql2` queries. 

**Tables:**
1. `users`: Admin credentials (hashed with bcrypt).
2. `site_settings`: Single row (`id='1'`) storing dynamic theme colors, typography, phone, address, and SEO descriptions.
3. `packages`: Off-road adventure packages (Title, description, price, duration, image).
4. `services`: (Pending CRUD) Services like Rental, Prep, Training.
5. `gallery_images`: (Pending CRUD) Images for the public gallery.

---

## 🎨 Dynamic Theming Engine
We built a highly scalable theming engine:
1. The Admin updates colors/fonts in `/admin/settings`.
2. The server action (`src/app/actions/settings.ts`) saves them to MySQL and calls `revalidatePath("/", "layout")`.
3. The root layout (`src/app/layout.tsx`) fetches these settings server-side and injects them into a `<style>` block mapped to standard Tailwind CSS variables (`--primary`, `--secondary`, `--accent`).
4. Result: **Zero-build dynamic UI customization.**

---

## 🔐 Authentication (NextAuth)
- **Endpoint:** `/api/auth/signin`
- **Default Credentials:** 
  - **Email:** `admin@xtreme-off-road.com`
  - **Password:** `password`
- **Logic:** Handled in `src/lib/auth.ts`. On first login, the system automatically creates the admin account using bcrypt hashing.

---

## ✅ Completed Tasks
- [x] MySQL Connection Pool Setup
- [x] Dynamic Theme Engine (Colors & Fonts)
- [x] Public Layout (Left/Right Drawers, Footer, Floating Buttons)
- [x] Public Homepage Replica (Hero Carousel, Review Cards)
- [x] NextAuth Installation & Route Handlers
- [x] Admin Dashboard UI
- [x] Admin Site Settings Form (CRUD)
- [x] Admin Packages Management (CRUD)

---

## 🚀 Next Steps (Tomorrow's To-Do)

1. **Services CRUD:**
   - Duplicate the logic from `admin/packages` to create `admin/services`.
   - Create server actions (`src/app/actions/services.ts`) to Insert/Delete rows in the `services` table.

2. **Gallery CRUD:**
   - Create an interface in `admin/gallery` to add image URLs.
   - Store these in the `gallery_images` table.

3. **Public Pages Data Binding:**
   - Go to the public pages (e.g., `/packages` or the homepage list) and replace static hardcoded data with `SELECT * FROM packages` queries.
   - Do the same for Services and the Gallery.

---

### Important Notes
- If you change the `.env` file, you **must** restart the `npm run dev` server for Next.js to apply the changes.
- Use `revalidatePath()` in your server actions so the public site updates instantly without requiring a hard refresh!
