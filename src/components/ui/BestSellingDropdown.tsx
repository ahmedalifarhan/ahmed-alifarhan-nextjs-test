"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type BestSellingDropdownProps = {
  children?: React.ReactNode;
};

const BestSellingDropdown: React.FC<BestSellingDropdownProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 h-[34px]"
      >
        <span
          className="font-[var(--font-volkhov)] text-[16px] leading-[24px] text-black"
          style={{ fontWeight: 400 }}
        >
          Best Selling
        </span>
        <ChevronDown
          className={`w-[16px] h-[16px] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          stroke="#000"
          strokeWidth={2}
        />
      </button>

      {/* dropdown products */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-10 bg-white w-[calc(100vw-2rem)] max-w-[1200px] p-4 shadow-md rounded">
          {children}
        </div>
      )}
    </div>
  );
};

export default BestSellingDropdown;
