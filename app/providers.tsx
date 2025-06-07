'use client'

import { ThemeProvider } from "@/components/themes/theme-provider"
import TanProvider from "@/lib/tanstack/TanProvider"

export default function Providers({ children }: { children: React.ReactNode }) {

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