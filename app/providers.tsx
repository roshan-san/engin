import { ThemeProvider } from "@/components/themes/theme-provider"
import TanProvider from "@/lib/tanstack/TanProvider"


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
    >
      <TanProvider>
        {children}
      </TanProvider>
    </ThemeProvider>
  )
} 