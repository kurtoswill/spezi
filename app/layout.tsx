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
      <body className="font-sans antialiased text-[#232C4F] min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-1 w-full">
          <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}