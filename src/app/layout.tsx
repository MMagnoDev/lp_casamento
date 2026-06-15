import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isadora & Wander | Nosso Casamento",
  description: "Site de casamento de Isadora e Wander. Confirme sua presença e confira as dicas e lista de presentes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${montserrat.variable} antialiased`}
    >
      <body className="bg-[#FAF6F3] text-[#3C2D24]">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
