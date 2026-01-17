import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tóc Salon | The Art of Đẹp",
  description: "Elite Vietnamese hair artistry. Experience the art of beauty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white min-h-screen" suppressHydrationWarning>
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
