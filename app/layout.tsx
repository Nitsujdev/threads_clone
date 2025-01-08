import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Threads",
  description: "A social media platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${urbanist.className} antialiased`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
