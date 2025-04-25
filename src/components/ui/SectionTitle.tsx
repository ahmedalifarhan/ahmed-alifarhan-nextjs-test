// // src/components/ui/SectionTitle.tsx

// import React from "react";
// import Link from "next/link";

// type SectionTitleProps = {
//   title: string;
//   linkText?: string;
//   linkHref?: string;
// };

// const SectionTitle: React.FC<SectionTitleProps> = ({
//   title,
//   linkText,
//   linkHref,
// }) => {
//   return (
//     <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto px-4 mt-20">
//       <h2 className="font-[var(--font-volkhov)] text-[32px] leading-[32px] text-black">
//         {title}
//       </h2>
//       {linkText && linkHref && (
//         <Link
//           href={linkHref}
//           className="font-[var(--font-poppins)] text-[16px] leading-[24px] text-[#7F7F7F] hover:underline"
//         >
//           {linkText}
//         </Link>
//       )}
//     </div>
//   );
// };

// export default SectionTitle;
