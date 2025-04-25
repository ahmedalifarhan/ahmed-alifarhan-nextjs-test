"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Footer() {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <footer className=" w-full py-6 px-6 md:px-16 bg-white relative z-50">
      <div className="flex items-center flex-wrap gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-[32px] md:text-[42px] lg:text-[52px] font-normal text-[#484848] font-[Volkhov]"
        >
          FASCO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex ml-auto">
          <nav className="flex gap-8 text-[#484848] text-[16px] font-[400] font-[Poppins]">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/products">Products</Link>
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
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Mobile menu icon */}
        <div className="flex items-center gap-4 md:hidden ml-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 w-full bg-white shadow-md flex flex-col px-6 py-4 gap-3 md:hidden text-[16px] text-[#484848] font-[Poppins] font-[400]">
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
          </div>
        </div>
      )}

      {/* حقوق النشر */}
      <div className="mt-6 text-center text-sm text-[#888] font-[Poppins]">
        Copyright © 2025 FASCO. All rights reserved.
      </div>
    </footer>
  );
}
