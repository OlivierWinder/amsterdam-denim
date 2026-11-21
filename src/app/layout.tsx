import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atelier — Amsterdam",
    template: "%s — Atelier",
  },
  description:
    "Bespoke denim, cut and sewn in-house in Amsterdam. Pairs made to order, by appointment.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="min-h-full">
      <body className="min-h-full font-serif antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
