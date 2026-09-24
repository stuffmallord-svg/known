import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KNOWN",
  description:
    "Someone who knows your world. A personal companion that remembers, notices and connects the things that matter to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}