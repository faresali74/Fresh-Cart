import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

const exoFont = Exo({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-exo",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freshcart",
  description: "E-commerce application using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${exoFont.variable} font-exo antialiased`}
      >
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Toaster position="top-center" reverseOrder={false} />
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
