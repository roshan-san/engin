import { ModeToggle } from '@/components/themes/theme-toggle'
import { Suspense } from 'react'
export default function Header() {
  return (
        <div className="w-screen p-4 flex items-center justify-between">
          <span className="text-4xl font-bold  uppercase tracking-wider text-primary">
            Engin
          </span>
          <Suspense>
            <ModeToggle />   
          </Suspense>
        </div>
  )
}
