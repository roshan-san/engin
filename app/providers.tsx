import TanProvider from "@/lib/tanstack/TanProvider"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange={false}
    >
      <TanProvider>
        {children}
      </TanProvider>
    </ThemeProvider>
  )
} 