import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import axios from "axios"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
axios.defaults.baseURL="http://localhost:4444"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engin",
  description: "later pa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SessionProvider>
     <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            >
            <Toaster />
            {children}
        </ThemeProvider>
            </SessionProvider>
      </body>
    </html>
  );
}
