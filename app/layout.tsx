import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { localBusinessSchema } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://playhousenursery.ae";

export const metadata: Metadata = {
  title: {
    default: "Playhouse Nursery Dubai | British EYFS Nursery in Dubai",
    template: "%s | Playhouse Nursery Dubai",
  },
  description:
    "Top British EYFS nursery and kindergarten in the UAE. KHDA & ADEK approved. 3 branches: Khalidiya, Al Reem & Mirdif. Ages 45 days to 5 years.",
  keywords: "nursery Dubai, EYFS nursery Dubai, British nursery Dubai, kindergarten Dubai, playhouse nursery, best nursery Dubai",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: BASE_URL,
    siteName: "Playhouse Nursery",
    title: "Playhouse Nursery | Where Fun & Learning Never Ends",
    description: "Top British EYFS nursery and kindergarten in the UAE. KHDA & ADEK approved. 3 branches.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Playhouse Nursery UAE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playhouse Nursery Dubai | Where Fun & Learning Never Ends",
    description: "Top British EYFS nursery and kindergarten in Dubai. KHDA & ADEK approved. 3 branches.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
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
    <html lang="en" className={montserrat.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
