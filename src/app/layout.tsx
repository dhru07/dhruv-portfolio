import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageTransition, ScrollProgressIndicator } from "@/components/motion";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

const bodyFont = localFont({ src: "./fonts/geist-latin.woff2", variable: "--font-body", display: "swap", weight: "100 900" });
const displayFont = localFont({ src: "./fonts/geist-mono-latin.woff2", variable: "--font-display", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Dhruv Singh | Business & Data Analyst | Data Engineer",
  description: "Professional portfolio of Dhruv Singh, Business & Data Analyst and Data Engineer.",
  alternates: { canonical: getAbsoluteUrl("/") },
  icons: { icon: withBasePath("/favicon.svg") },
  openGraph: {
    title: "Dhruv Singh | Business & Data Analyst | Data Engineer",
    description: "Professional portfolio of Dhruv Singh, Business & Data Analyst and Data Engineer.",
    siteName: "Dhruv Singh Portfolio",
    type: "website",
    url: getAbsoluteUrl("/"),
    images: [{ url: getAbsoluteUrl("/images/profile/hero.webp"), alt: "Portrait of Dhruv Singh" }],
  },
  twitter: {
    card: "summary",
    title: "Dhruv Singh | Business & Data Analyst | Data Engineer",
    description: "Professional portfolio of Dhruv Singh, Business & Data Analyst and Data Engineer.",
    images: [getAbsoluteUrl("/images/profile/hero.webp")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${bodyFont.variable} ${displayFont.variable}`} data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body>
        <Script id="portfolio-theme-init" strategy="beforeInteractive">{`try { if (localStorage.getItem("portfolio-theme") === "light") document.documentElement.dataset.theme = "light"; } catch {}`}</Script>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <ScrollProgressIndicator />
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
