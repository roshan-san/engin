import DashHeader from './components/DashHeader'
import DashHero from './components/DashHero'
import StartupCard from './components/StartupCard'
import { useStartups } from './hooks/useStartups'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {

 
  return (
    <div className="h-full flex flex-col p-4 gap-10">
      <DashHeader/>
      {/* Cards */}
      <DashHero/>
      
    </div>
  )
}
