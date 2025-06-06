import type { Metadata } from "next"
import Providers from "@/app/providers"
import "@/app/globals.css"
export const metadata: Metadata = {
  title: "Engin",
  description: "Engin is a platform where startup founders, collaborators, mentors, and investors connect to build, fund, and grow startups together",
  icons: [
    {
      url: '/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: '/icon-512x512.png', 
      sizes: '512x512',
      type: 'image/png',
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}