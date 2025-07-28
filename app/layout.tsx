import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spezi",
  description: "Speak English Professionally and Confidently",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable}`}>
      <body className="font-sans antialiased text-[#232C4F]">
        <Toaster position="top-center" />
        <Navbar />
        <main className="px-6 md:px-24 lg:px-[150px] pt-38 2xl:max-w-screen-2xl 2xl:mx-auto">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
