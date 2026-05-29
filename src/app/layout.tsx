import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Promo Agung Toyota Terbaik - Harga Terbaru & Diskon",
  description: "Dapatkan penawaran terbaik mobil Toyota di Agung Toyota. Harga terbaru, diskon, dan spesifikasi lengkap untuk semua jenis mobil Toyota.",
  keywords: "Agung Toyota, Promo Toyota, Harga Toyota, Dealer Toyota",

  verification: {
    google: "Nneh1V8Cy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className={`font-sans antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50`}>
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
