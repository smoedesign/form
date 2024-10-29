import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMOEDESIGN",
  description: "Crafting digital experiences that inspire and engage. We're working hard to bring you something amazing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
       <link
  rel="icon"
  href="/icon?<generated>"
  type="image/<generated>"
  sizes="<generated>"
/>
<meta name="google-site-verification" content="ceEj7khefufiSShugSZqerrttSYbTex_cH1dhcUrihg" />
    </head>
      <body className={inter.className}>{children}

      <Analytics />
      <SpeedInsights />

      </body>
      <GoogleAnalytics gaId="G-NXFB1X5BG4" />

    </html>
    
  );
}
