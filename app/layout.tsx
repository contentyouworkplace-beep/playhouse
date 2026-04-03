import type { Metadata } from "next";
import { Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { localBusinessSchema } from "@/lib/seo";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hadeed-transport.com";

export const metadata: Metadata = {
  title: {
    default: "Playhouse Nursery Dubai | British EYFS Nursery in Dubai",
    template: "%s | Playhouse Nursery Dubai",
  },
  description:
    "Top British EYFS nursery and kindergarten in Dubai. KHDA approved. 3 branches: Marina, Downtown & Jumeirah. Ages 45 days to 6 years.",
  keywords: "nursery Dubai, EYFS nursery Dubai, British nursery Dubai, kindergarten Dubai, playhouse nursery, best nursery Dubai",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: BASE_URL,
    siteName: "Hadeed Transport",
    title: "Hadeed Transport | Where Logistics Meet Innovation",
    description: "Reliable logistics and transport services across UAE since 2015.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Playhouse Nursery Dubai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playhouse Nursery Dubai | Where Fun & Learning Never Ends",
    description: "Top British EYFS nursery and kindergarten in Dubai. KHDA approved. 3 branches.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
    <html lang="en" className={`${lato.variable} ${cormorant.variable}`}>
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
      <body style={{ fontFamily: "var(--font-lato), Lato, sans-serif" }}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
