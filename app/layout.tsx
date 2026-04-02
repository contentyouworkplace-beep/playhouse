import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { localBusinessSchema } from "@/lib/seo";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hadeed-transport.com";

export const metadata: Metadata = {
  title: {
    default: "Hadeed Transport | Where Logistics Meet Innovation",
    template: "%s | Hadeed Transport",
  },
  description:
    "Reliable logistics and transport services across UAE since 2015. Equipment rental, cargo, personnel transport, and more.",
  keywords: "transport UAE, logistics Dubai, equipment rental, cargo transport, Hadeed Transport",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: BASE_URL,
    siteName: "Hadeed Transport",
    title: "Hadeed Transport | Where Logistics Meet Innovation",
    description: "Reliable logistics and transport services across UAE since 2015.",
    images: [{ url: "/het-logo.png", width: 1200, height: 630, alt: "Hadeed Transport" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hadeed Transport | Where Logistics Meet Innovation",
    description: "Reliable logistics and transport services across UAE since 2015.",
    images: ["/het-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
