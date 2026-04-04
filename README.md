# 🍽️ Platera — Frontend

**A modern food ordering platform connecting hungry customers with trusted food providers.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

🌐 **Live Site:** [project-live-link-here](https://foodhub-frontend-lime.vercel.app) &nbsp;|&nbsp; 🔗 **Backend API:** [backend-github-url-link](https://github.com/tabib-e-alahi/next_level_assignment_4_backend_part)



---

## 📖 What is Platera?

Platera is a full-featured food ordering web application. Think of it like a digital marketplace — food providers list their meals, customers browse and order, and an admin keeps everything running smoothly.

The platform has three types of users, each with their own experience:

| 👤 Role | 🎯 What They Can Do |
|---|---|
| **Customer** | Browse meals, add to cart, place orders, write reviews, manage profile |
| **Provider** | List meals, manage their menu, view and update incoming orders |
| **Admin** | View all users, manage categories, monitor all orders across the platform |

---

## ✨ Key Features

- 🏠 **Beautiful Homepage** — Hero section, top categories, top providers, and platform stats
- 🔐 **Auth System** — Secure login & registration with role-based access
- 🛒 **Shopping Cart** — Add meals, review order summary, and proceed to checkout
- 💳 **Checkout Flow** — Smooth, multi-step order placement experience
- 📦 **Order Tracking** — Customers and providers can view order status in real time
- 🍛 **Meal Browsing** — Filter and explore meals with detailed individual meal pages
- ⭐ **Reviews** — Customers can leave star ratings and reviews after ordering
- 🏪 **Provider Directory** — Browse all food providers with profile details
- 📊 **Role-Based Dashboards** — Separate, purpose-built dashboards for each user type
- 📱 **Responsive Design** — Works great on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

> *Don't worry if these are unfamiliar — here's a plain-English explanation of what each one does.*

| Technology | What It Does |
|---|---|
| **Next.js 16** | The main framework — builds the pages and handles routing (navigation between pages) |
| **React 19** | Powers the interactive parts of the UI (buttons, forms, dynamic content) |
| **TypeScript** | A smarter version of JavaScript that catches errors before they happen |
| **Tailwind CSS 4** | A utility-first styling system — makes the app look good without writing lots of CSS |
| **shadcn/ui + Radix UI** | Pre-built, accessible UI components (buttons, inputs, dropdowns, etc.) |
| **React Hook Form** | Handles all form interactions (login, registration, adding meals, etc.) |
| **Zod** | Validates form data — makes sure users fill in the right information |
| **JWT Decode** | Reads login tokens to identify who the user is and what role they have |
| **Lucide React** | A clean icon library used throughout the UI |
| **Sonner** | Displays toast notifications (pop-up messages like "Order placed!") |
| **Embla Carousel** | Powers the image/content carousels on the homepage |
| **pnpm** | A fast and efficient package manager (like npm, but better) |

---

## 📁 Project Structure (Simplified)

```
src/
├── app/
│   ├── (auth)/              → Login & Register pages
│   ├── (commonLayout)/      → Public pages (Home, Meals, Cart, Checkout)
│   └── (dashboardLayout)/
│       ├── @admin/          → Admin dashboard (users, orders, categories)
│       ├── @provider/       → Provider dashboard (meals, orders, profile)
│       └── @customer/       → Customer dashboard (orders, reviews, profile)
├── components/              → Reusable UI components
├── services/                → API call functions (connects to backend)
├── types/                   → TypeScript type definitions
├── routes/                  → Navigation config per role
└── providers/               → Auth context / session management
```

---

## 🚀 How to Run Locally

Follow these steps to get the project running on your own computer.

### ✅ Prerequisites

Make sure you have these installed:

- **Node.js** (v18 or higher) → [Download here](https://nodejs.org/)
- **pnpm** → Install by running: `npm install -g pnpm`
- A running instance of the **FoodHub backend** (or use the deployed backend URL)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

> Replace the URL with your actual GitHub repo link.

---

### Step 2 — Install Dependencies

```bash
pnpm install
```

This downloads all the packages the project needs. It may take a minute.

---

### Step 3 — Set Up Environment Variables

Create a file named `.env.local` in the root of the project:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your backend URL:

```env
NEXT_PUBLIC_BASE_URL=https://your-backend-url-here.com
```

> This tells the frontend where to send API requests (login, meals, orders, etc.)

---

### Step 4 — Start the Development Server

```bash
pnpm dev
```

The app will be running at **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 🏗️ Build for Production

To create an optimized production build:

```bash
pnpm build
pnpm start
```

---

## 🌐 Deployment

This project is ready to deploy on **[Vercel](https://vercel.com)** — the platform made by the same team behind Next.js.

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Or locally run cli command `vercel --prod` and deploy
4. Add your `NEXT_PUBLIC_BASE_URL` environment variable in the Vercel dashboard
4. Deploy! ✅

---

## 📬 Contact

Have questions or feedback? Feel free to reach out or open an issue on GitHub.

