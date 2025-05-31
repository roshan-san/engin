"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <Sun 
        className="h-4 w-4 transition-all duration-500 ease-in-out transform" 
        style={{ 
          opacity: theme === 'dark' ? 0.5 : 1,
          transform: theme === 'dark' ? 'scale(0.9)' : 'scale(1)',
        }} 
      />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
      />
      <Moon 
        className="h-4 w-4 transition-all duration-500 ease-in-out transform" 
        style={{ 
          opacity: theme === 'light' ? 0.5 : 1,
          transform: theme === 'light' ? 'scale(0.9)' : 'scale(1)',
        }} 
      />
    </div>
  )
}
