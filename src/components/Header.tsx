"use client";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import {
  Menu,
  X,
  ChevronDown,
  Search,
  User,
  Heart,
  ShoppingCart,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items); // ✅ استخدام ريدكس
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0); // ✅ حساب العدد مباشرة

  return (
    <header className="w-full py-4 px-6 md:px-16 flex justify-between items-center bg-white relative z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-[32px] md:text-[42px] lg:text-[52px] font-normal text-[#484848] font-[Volkhov]"
      >
        FASCO
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-[#484848] text-[16px] font-[400] font-[Poppins] relative">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/products/1">Products</Link>
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsPagesOpen(true)}
          onMouseLeave={() => setIsPagesOpen(false)}
        >
          <div className="flex items-center gap-1">
            <span>Pages</span>
            <ChevronDown size={16} />
          </div>

          {isPagesOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-md rounded-md">
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Contact
              </Link>
              <Link href="/faq" className="block px-4 py-2 hover:bg-gray-100">
                FAQ
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Tools */}
      <div className="flex items-center gap-4">
        <button aria-label="Search">
          <Search size={20} className="text-gray-700" />
        </button>
        <button aria-label="User">
          <User size={20} className="text-gray-700" />
        </button>
        <button aria-label="Wishlist">
          <Heart size={20} className="text-gray-700" />
        </button>

        {/* Cart with Quantity Badge */}
        <Link href="/cart" aria-label="Cart" className="relative">
          <ShoppingCart size={20} className="text-gray-700" />
          {totalQuantity > 0 && (
            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col px-6 py-4 gap-3 md:hidden text-[16px] text-[#484848] font-[Poppins] font-[400]">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/products" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1 cursor-pointer">
              Pages <ChevronDown size={16} />
            </span>
            <div className="pl-4 flex flex-col">
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/faq" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
