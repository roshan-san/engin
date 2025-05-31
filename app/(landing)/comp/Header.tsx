import { ModeToggle } from '@/components/themes/theme-toggle'
export default function Header() {
  return (
        <div className="max-w-screen p-6 flex items-center justify-between">
          <span className="text-4xl font-bold text-primary">
            Engin
          </span>
          <ModeToggle />   
        </div>
  )
}
