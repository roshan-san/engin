"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function TanProvider({children}:{children:React.ReactNode}){
    const queryclient= new QueryClient()
    return(
        <QueryClientProvider client={queryclient}>
            {children}
        </QueryClientProvider>
    )
}