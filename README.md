# Fasco – E-Commerce Store 🛍️

A modern, responsive, and stylish e-commerce application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, and **Lucide Icons**.  
This project includes essential shopping features like product browsing, cart management, and responsive UI.

## 🚀 Tech Stack

- **Next.js 14 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit**
- **Lucide React Icons**

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ahmedalifarhan/fasco-ecommerce.git

cd fasco-ecommerce
```

### 2. Install Dependencies

Make sure you have **Node.js** installed (preferably version 18+):

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📁 Project Structure

```bash
.
├── app/                  # Next.js App Router pages and layout
├── components/           # Reusable components (Header, Footer, etc.)
├── public/               # Static assets (images, icons)
├── redux/                # Redux store and slices
│   ├── store.ts
│   ├── cartSlice.ts
│   └── productSlice.ts
├── styles/               # Global styles and Tailwind config
├── types/                # TypeScript interfaces
├── .env.local            # Environment variables (if needed)
├── README.md
└── next.config.js        # Next.js configuration
```

---

## 🛠 Features

- 🛍️ Add/remove products from cart
- 🔢 Quantity management (increase/decrease)
- 🧾 View cart item count
- 🔄 Fully integrated Redux state management
- 🧹 Responsive and accessible UI
- 🌐 Clean navigation and product routes

---

## 📌 Notes

- This project uses **App Router** in Next.js 14.
- All components that use Redux must be **client components** (`"use client"`).
- The `ReduxProvider` wrapper is required in `layout.tsx` or root layout to provide the store globally.

---

## 🧪 Deployment

You can deploy this app to:

- [Vercel](https://vercel.com) – Best with Next.js (Recommended)
- [Netlify](https://netlify.com)
- Any Node.js-supported host

> To deploy with Vercel:
>
> 1. Push your code to GitHub
> 2. Go to [https://vercel.com/import](https://vercel.com/import)
> 3. Select your repo and follow the instructions

---

## ✨ Contributing

Pull requests are welcome. If you'd like to improve this template or add new features, feel free to fork it and submit a PR.

---

## 📧 Contact

If you have any questions or ideas, feel free to reach out via [GitHub Issues](https://github.com/your-username/fasco-ecommerce/issues).

---

## 📄 License

This project is licensed under the **MIT License**.
