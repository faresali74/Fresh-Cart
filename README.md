# 🛒 FreshCart — E-Commerce Platform

A high-performance, production-ready e-commerce application built with a modern tech stack, emphasizing clean architecture, type safety, and an exceptional user experience.

🔗 **Live Demo:** [fresh-cart-fares-alis-projects-81c35373.vercel.app](https://fresh-cart-fares-alis-projects-81c35373.vercel.app)

---

## 🚀 Tech Stack

| Category         | Technology               |
| ---------------- | ------------------------ |
| Framework        | Next.js 14+ (App Router) |
| Language         | TypeScript               |
| Styling          | Tailwind CSS             |
| Authentication   | NextAuth.js              |
| State Management | React Context API        |
| UI Helpers       | SweetAlert2, React Icons |

---

## ✨ Features

- **Smart Checkout Flow** — Extensible payment architecture supporting Cash & Online payments via the Factory Method Pattern
- **Address Management** — Seamlessly handles saved and custom shipping addresses
- **Order Tracking** — Real-time order history with status updates and detailed breakdowns
- **Wishlist** — Persistent wishlist with optimistic UI updates
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop

---

## 🏗️ Architecture Highlights

**Server/Client Hybrid**
Leverages Next.js Server Components for data fetching and SEO optmization, while isolating interactivity within lean Client Components.

**Factory Method Pattern**
Payment processing is abstracted behind a `PaymentFactory`, making it trivial to add new gateways (Stripe, PayPal) without touching UI logic.

**Full Type Safety**
End-to-end TypeScript coverage across all API services, context providers, and UI components — zero `any` types.

---

## 📂 Project Structure

src/
├── app/ # Pages, layouts & metadata (App Router)
├── Services/ # Typed API integration layer
├── PaymentFactory/ # Payment processor implementations
├── context/ # Global state (Cart, Wishlist)
└── types/ # Shared TypeScript interfaces

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
# Clone the repository
git clone https://github.com/faresali74/Fresh-Cart.git
cd freshcart

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

MIT © [Fares Ali](https://github.com/faresali74)
