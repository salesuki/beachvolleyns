import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novi Sad Beach Volleyball Club",
  description: "Profesionalni klub odbojke na pesku u Novom Sadu. Treninzi, turniri i škola beach volleyballa za sve uzraste.",
  keywords: ["beach volleyball", "odbojka na pesku", "Novi Sad", "Štrand", "treninzi", "turniri"],
  openGraph: {
    title: "Novi Sad Beach Volleyball Club",
    description: "Beach volleyball klub — treninzi, turniri i škola odbojke na pesku za sve uzraste.",
    locale: "sr_RS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
