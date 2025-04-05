"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from 'react'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export default function TanstackProvider({children}:{children:React.ReactNode}) {
    const [queryClient] = useState(()=>new QueryClient())           
  return (
    <QueryClientProvider client={new QueryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}  />
    </QueryClientProvider>
  )
}
