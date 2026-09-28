import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StoreProvider } from "@/lib/store";

import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stepstyle.example"),
  title: {
    default: "STEPSTYLE — Engineered Everyday Footwear & Apparel",
    template: "%s | STEPSTYLE",
  },
  description:
    "Signature Italian-made sneakers, dress loafers, technical runners and an engineered everyday uniform. Free express shipping over ₹999, 7-day instant returns.",
  keywords: [
    "STEPSTYLE",
    "sneakers",
    "leather loafers",
    "running trainers",
    "linen overshirt",
    "everyday uniform",
  ],
  openGraph: {
    title: "STEPSTYLE — Engineered Everyday Footwear & Apparel",
    description:
      "Signature Italian-made sneakers, dress loafers and an engineered everyday uniform.",
    type: "website",
    siteName: "STEPSTYLE",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

/**
 * Runs before first paint so the announcement strip never flashes on the way
 * back in from a visit where the shopper dismissed it. `--header-h` in
 * `globals.css` keys off this same `data-announcement` attribute.
 */
const ANNOUNCEMENT_SCRIPT = `try{if(localStorage.getItem("stepstyle.announcement.v1")==="hidden"){document.documentElement.dataset.announcement="hidden"}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-announcement="visible"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: ANNOUNCEMENT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-surface font-body-md text-body-md text-on-surface">
        <StoreProvider>
          <SiteHeader />
          <main className="flex-1 pt-[var(--header-h)]">{children as ReactNode}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
