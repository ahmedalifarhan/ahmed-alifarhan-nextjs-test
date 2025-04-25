import { Volkhov } from "next/font/google";
const volkhov = Volkhov({ weight: ["400"], subsets: ["latin"] });

export default function PageTitle({ title }: { title: string }) {
  return (
    <h1
      className={`${volkhov.className} text-[42px] leading-[32px] text-[#000000] text-center mt-20`}
    >
      {title}
    </h1>
  );
}
