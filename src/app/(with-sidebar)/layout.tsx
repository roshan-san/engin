import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
export default function layout({children}:{ children:React.ReactNode}) {
  return (
    <div className='flex h-screen'>

    <SidebarProvider defaultOpen={false}  >
    <AppSidebar />

    
    <main>
      <SidebarTrigger className="md:hidden" />
      {children}
      </main>
    </SidebarProvider>
      </div>
  )
}   
