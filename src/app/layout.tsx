import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wellnessnursepro.com"),
  title: "Wellness Nurse Pro — Your Guide to Holistic Health",
  description:
    "Discover the NEWSTART lifestyle principles for vibrant health. Evidence-based wellness guidance from a registered nurse covering nutrition, exercise, water, sunlight, temperance, air, rest, and trust.",
  keywords: [
    "wellness",
    "holistic health",
    "NEWSTART",
    "nurse wellness",
    "nutrition",
    "exercise",
    "healthy lifestyle",
    "eight laws of health",
  ],
  authors: [{ name: "Wellness Nurse Pro" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Wellness Nurse Pro — Your Guide to Holistic Health",
    description:
      "Evidence-based wellness guidance rooted in the NEWSTART lifestyle principles. Nutrition, exercise, water, sunlight, temperance, air, rest, and trust.",
    type: "website",
    locale: "en_US",
    siteName: "Wellness Nurse Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Nurse Pro — Your Guide to Holistic Health",
    description:
      "Evidence-based wellness guidance rooted in the NEWSTART lifestyle principles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <OrganizationSchema />
          <WebSiteSchema />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
