import { ThemeProvider } from "@/components/themes/theme-provider";
import "./globals.css";
import TanstackProvider from "@/providers/tanstack-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
            <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            </TanstackProvider>
        </body>
      </html>
    </>
  )
}