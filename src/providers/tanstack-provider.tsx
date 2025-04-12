"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from 'react'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function TanstackProvider({children}:{children:React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
