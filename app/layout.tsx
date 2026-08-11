import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ConsentBanner } from "./components/ConsentBanner";
import "./globals.css";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://anantara.world"),
  title: { default: "ANANTARA WORLD | Premium Living in Kanpur", template: "%s" },
  description: "ANANTARA WORLD by Mahadev Developers — premium 3 and 4-bedroom residences shaped around architecture, landscape and family life in Kanpur.",
  applicationName: "ANANTARA WORLD",
  authors: [{ name: "Mahadev Developers" }],
  creator: "Mahadev Developers",
  keywords: ["ANANTARA WORLD", "Mahadev Developers", "premium residences Kanpur", "3 bedroom residence Kanpur", "4 bedroom residence Kanpur", "Ambedkar Puram Yojna"],
  icons: { icon: "/og.png" },
  openGraph: { type: "website", locale: "en_IN", siteName: "ANANTARA WORLD", title: "ANANTARA WORLD | Premium Living. Timeless Value.", description: "A considered world of architecture, landscape and family life in Kanpur.", images: [{ url: "/og.png", width: 1734, height: 907, alt: "ANANTARA WORLD — Premium Living. Timeless Value. Artistic impression." }] },
  twitter: { card: "summary_large_image", title: "ANANTARA WORLD | Premium Living. Timeless Value.", description: "A considered world of architecture, landscape and family life in Kanpur.", images: ["/og.png"] },
  category: "real estate",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2B1227", colorScheme: "light" };

const structuredData = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": "https://anantara.world/#organization", name: "Mahadev Developers", url: "https://anantara.world", email: "info@anantara.world", telephone: "+91 98394 25522", address: { "@type": "PostalAddress", streetAddress: "Building No. 125/19-A, Block U, Govind Nagar Road", addressLocality: "Kanpur", addressRegion: "Uttar Pradesh", postalCode: "208006", addressCountry: "IN" } },
    { "@type": "WebSite", "@id": "https://anantara.world/#website", url: "https://anantara.world", name: "ANANTARA WORLD", publisher: { "@id": "https://anantara.world/#organization" }, inLanguage: "en-IN" },
    { "@type": "Place", "@id": "https://anantara.world/#project", name: "ANANTARA WORLD", description: "A residential development by Mahadev Developers in Kanpur.", address: { "@type": "PostalAddress", streetAddress: "Ambedkar Puram Yojna, Awas Vikas", addressLocality: "Kanpur", addressRegion: "Uttar Pradesh", addressCountry: "IN" } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}<ConsentBanner /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
