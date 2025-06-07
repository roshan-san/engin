'use client'

import { ThemeProvider } from "@/components/themes/theme-provider"
import TanProvider from "@/lib/tanstack/TanProvider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

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