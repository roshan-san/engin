import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
const queryClient = new QueryClient()
export default function layout({children}:{ children:React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient} >

    <SidebarProvider defaultOpen={false}  >
    <AppSidebar />
    
    <main>
      <SidebarTrigger className="md:hidden" />
      {children}
      </main>
    </SidebarProvider>
    </QueryClientProvider>
  )
}   
