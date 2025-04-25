"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationSlider = () => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = 3;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
    }
  };

  return (
    <div className="flex items-center gap-4 justify-center mt-6">
      {/* زر الرجوع */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-[3px] text-black/50 hover:bg-black hover:text-white transition"
        onClick={() => goToPage(activePage - 1)}
        disabled={activePage === 1}
      >
        {activePage !== 1 ? (
          <ChevronLeft size={16} />
        ) : (
          <span className="w-4 h-4" />
        )}{" "}
        {/* مكان فاضي بنفس الحجم */}
      </button>

      {/* أرقام الصفحات */}
      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`w-8 h-8 rounded-[50px] flex items-center justify-center transition font-medium text-sm ${
            activePage === page
              ? "bg-[#F2F2F2] text-black"
              : "bg-white text-black/50 hover:bg-black hover:text-white"
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {/* زر التقديم */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-[50px] text-black/50 hover:bg-black hover:text-white transition"
        onClick={() => goToPage(activePage + 1)}
        disabled={activePage === totalPages}
      >
        {activePage !== totalPages ? (
          <ChevronRight size={16} />
        ) : (
          <span className="w-4 h-4" /> // مكان فاضي بنفس حجم الأيقونة
        )}
      </button>
    </div>
  );
};

export default PaginationSlider;
