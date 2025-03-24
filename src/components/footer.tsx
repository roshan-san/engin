"use client"
import React from 'react'

export default function footer() {
  return (
    <footer className="p-4 text-center text-sm text-muted-foreground border-t" onClick={() =>{localStorage.setItem("isRegistered", "true");}}>
    © {new Date().getFullYear()} Engin. All rights reserved.
     </footer>)
}

