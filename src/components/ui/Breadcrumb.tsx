// src/components/ui/Breadcrumb.tsx

import React from "react";

type BreadcrumbProps = {
  current: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ current }) => {
  return (
    <div className="flex items-center justify-center gap-[8px] mt-[10px] h-[24px] font-[var(--font-jost)]">
      <span className="text-[#000000] text-[15px] leading-[22.5px]">Home</span>
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        className="mt-[2px]"
      >
        <path
          d="M3 1L6 4.5L3 8"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[#000000] text-[16px] leading-[24px]">
        {current}
      </span>
    </div>
  );
};

export default Breadcrumb;
