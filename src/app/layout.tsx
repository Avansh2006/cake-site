import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Signature Collection | Luxury Pâtisserie",
  description: "Crafted to be remembered. A composition of texture, detail, and flavour—made to be discovered slowly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} bg-[#120D0A] text-white font-sans antialiased selection:bg-[#C6A15B]/30`}>
        {children}
      </body>
    </html>
  );
}
