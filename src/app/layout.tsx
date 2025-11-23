import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { PerfumeSuggester } from "@/components/PerfumeSuggester";
import { PromotionalPopup } from "@/components/PromotionalPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoku Perfume | Luxury Fragrances",
  description: "Experience the essence of luxury with Zoku Perfume. Handcrafted fragrances for the discerning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-foreground`}
        suppressHydrationWarning
      >
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <PerfumeSuggester />
          <PromotionalPopup />
        </CartProvider>
      </body>
    </html>
  );
}
