"use client"
import { Button } from '@/components/ui/button'
import { Startup } from '@/types/types'
import axios from 'axios'
import React from 'react'
import { toast } from 'sonner'

export default function page() {
  const sampledata:Partial<Startup>={
    name:"ekospex",
    description:"glasses to help the blind",
    problem:"blind ppl finnnd it hard to navigate",
    solution:"an ai powered glasses that will guide your way",
    industry:"healthcare",
    location:"chennai",
    teamSize:10,
    patent:"not yet",
    funding:10000,
    founderId:1,
  }
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4444/createstartup", sampledata, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      toast.error("lalalal")
    } catch (error) {
      toast.error("Error creating startup")
    }
    
  } 
  return (
    <div>
      <Button onClick={handleSubmit}>
        click me for req  

      </Button>
    </div>
  )
}
