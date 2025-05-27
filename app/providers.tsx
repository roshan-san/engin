
import TanProvider from "@/lib/tanstack/TanProvider"
import { ThemeProvider } from "next-themes"
export function Providers({ children }: { children: React.ReactNode }) {
return (
    <TanProvider>

    <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    >
        {children}
    </ThemeProvider>
      </TanProvider>
  )
} 