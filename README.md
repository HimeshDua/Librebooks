<div align="center">
  <img src="public/libre-icon.png" alt="LibreBooks Logo" width="120" height="120" />
  <h1>LibreBooks</h1>
  <p><strong>A free, open-source PWA for reading 12,000+ public-domain classics with a clean, distraction-free interface.</strong></p>
  <p>
    <a href="https://librebooks.vercel.app/">Live Demo</a> •
    <a href="https://github.com/HimeshDua/Librebooks">GitHub Repository</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=flat&logo=supabase" alt="Supabase" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel" alt="Vercel" />
    <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa" alt="PWA" />
  </p>
</div>

---

## ✨ Features

- **Read Anywhere:** Swipe-to-read interface optimized for mobile.
- **Desktop Friendly:** Highlight & save your favorite lines.
- **Smart Recommendations:** Discover new classics based on your taste.
- **Bookmarks & Favorites:** Keep track of your reading list.
- **Progress Tracking:** Pick up exactly where you left off.
- **Offline Ready:** Fully functional PWA support.
- **Massive Library:** Access 12,000+ public domain classics.
- **Distraction-Free:** No ads, no popups, just the text.
- **Blazing Fast:** Instant load times and smooth transitions.
- **Modern UI:** Clean, minimalist design focused on readability.

---

## 🧠 Philosophy

LibreBooks isn't a startup. It's a passion project built to solve a simple problem: the lack of a truly clean, open-source reader for public domain books.

We believe reading should be:

1.  **Seamless:** No friction between you and the book.
2.  **Accessible:** Free forever, on any device.
3.  **Beautiful:** Interface matters. Good typography matters.

This project documents the journey of building a production-grade application for the sheer joy of engineering and reading.

---

## 🛠️ Tech Stack

Built with a modern, type-safe stack for performance and developer experience.

- **[Next.js 16 (App Router)](https://nextjs.org/):** The framework for the web. Used for server components, routing, and optimization.
- **[Supabase](https://supabase.com/):** The open source Firebase alternative. Handles Auth, Database, and real-time features.
- **[TypeScript](https://www.typescriptlang.org/):** Strict typing for maintainable, bug-free code.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Utility-first CSS framework for rapid UI development.
- **[shadcn/ui](https://ui.shadcn.com/):** Beautifully designed, accessible components.
- **[Framer Motion](https://www.framer.com/motion/):** Smooth, declarative animations.
- **[Zustand](https://github.com/pmndrs/zustand):** Small, fast, and scalable state-management solution.
- **Next-PWA:** Progressive Web App capabilities for offline support and installability.
- **Vercel:** Zero-config deployment and edge network global distribution.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Clone Repository

```bash
git clone https://github.com/HimeshDua/Librebooks.git
cd Librebooks
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Project Structure

A high-level overview of the codebase organization.

- `app/`: Next.js App Router pages, layouts, and API routes.
- `components/`: Reusable UI components (shadcn/ui, custom blocks).
- `lib/`: Utility functions, Supabase client configuration, and constants.
- `hooks/`: Custom React hooks for logic reuse.
- `store/`: Global state management with Zustand.
- `types/`: TypeScript interfaces and type definitions.
- `public/`: Static assets like images and icons.

---

## 🌍 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the **Environment Variables** (Supabase URL & Key) in the Vercel dashboard.
4.  Click **Deploy**. Your app will be live in minutes.

---

## 📊 Nerd Stats

Because we love the details:

- **Framework:** Next.js 16 (App Router)
- **Backend:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **PWA:** Fully compliant (installable, offline support)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Type Safety:** 100% Strict TypeScript
- **Caching:** Aggressive Next.js caching layers

---

## 🤝 Contributing

Contributions are welcome! Whether it's fixing a bug, adding a feature, or improving documentation.

1.  Fork the repository.
2.  Create a feature branch.
3.  Commit your changes.
4.  Open a Pull Request.

Let's build the best open-source reading experience together.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
