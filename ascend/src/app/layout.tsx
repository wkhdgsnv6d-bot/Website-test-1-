import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/brand";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Less Admin. More Growth.`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "Websites, AI and connected business systems built around how your business actually operates. Keep what works. Upgrade what doesn't.",
  openGraph: {
    title: `${BRAND.name} — Less Admin. More Growth.`,
    description:
      "Websites, AI, automation and connected business systems. The Ascend System: Attract, Capture, Respond, Qualify, Convert, Manage, Deliver, Retain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
