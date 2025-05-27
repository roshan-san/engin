"use client"
import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "./get-query-client"

export default function TanProvider({children}:{children:React.ReactNode}){
    const queryclient= getQueryClient()
    return(
        <QueryClientProvider client={queryclient}>
            {children}
        </QueryClientProvider>
    )
}