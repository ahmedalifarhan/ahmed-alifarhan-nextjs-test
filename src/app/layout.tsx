// app/layout.tsx

import type { Metadata } from "next";
import { Jost, Volkhov, Poppins } from "next/font/google";
import ReduxProvider from "@/redux/Provider";
import Header from "@/components/Header";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const volkhov = Volkhov({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-volkhov",
});

const jost = Jost({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Fasco",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${volkhov.variable} ${jost.variable}`}
    >
      <body className="font-[var(--font-poppins)]">
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
