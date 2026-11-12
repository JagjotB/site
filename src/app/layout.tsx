import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./authentic.css";

const editorial = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const modern = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-modern",
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  title: {
    default: "The Art of Us — Private Edition 01/01",
    template: "%s — The Art of Us",
  },
  description: "An original private collection, made for one.",
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111315",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${editorial.variable} ${modern.variable}`}>
      <body>{children}</body>
    </html>
  );
}
