import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "@/providers/tanstack-provider";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engin | Innovate. Connect. Fund. Succeed.",
  description: "Engin - A platform for innovation, connection, funding, and success.",
  keywords: ["innovation", "funding", "startup", "entrepreneurship", "connect"],
  authors: [{ name: "Engin Team" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <TanstackProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
            >
              <div className="relative flex min-h-screen flex-col">
                <Toaster />
                {children}
              </div>
            </ThemeProvider>
          </SessionProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
