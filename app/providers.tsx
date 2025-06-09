import { ThemeProvider } from "@/components/themes/theme-provider"
import TanProvider from "@/lib/tanstack/TanProvider"
import { AuthProvider } from "@/context/AuthContext"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
    >
      <TanProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </TanProvider>
    </ThemeProvider>
  )
} 