// ViewStyleSwitcher.tsx
"use client";

import React from "react";

type ViewType = 3 | 4 | 5;

type Props = {
  activeView: ViewType;
  onChange: (view: ViewType) => void;
};

const buttonStyle =
  "rounded-[3px] p-[11px] flex items-center justify-center transition-colors duration-200 w-[34px] h-[34px]";
const lineStyle = "w-[2px] h-[12px] rounded-sm";

const ViewStyleSwitcher: React.FC<Props> = ({ activeView, onChange }) => {
  const renderLines = (count: number, active: boolean) => (
    <div className="flex gap-[1px]">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`${lineStyle} ${
            active ? "bg-white" : "bg-black opacity-50"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex w-[130px] h-[34px] gap-[15px]">
      {([3, 4, 5] as ViewType[]).map((count) => (
        <button
          key={count}
          className={`${buttonStyle} ${
            activeView === count ? "bg-black" : "bg-[#F2F2F2]"
          }`}
          onClick={() => onChange(count)}
        >
          {renderLines(count, activeView === count)}
        </button>
      ))}
    </div>
  );
};

export default ViewStyleSwitcher;
