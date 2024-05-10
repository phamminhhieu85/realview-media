import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realview Media",
  description: "Realview Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mont.className} suppressHydrationWarning>
        <SmoothScroll>
          <Toaster position="top-center" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
