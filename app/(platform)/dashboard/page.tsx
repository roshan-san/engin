import DashHeader from './components/DashHeader'
import DashHero from './components/DashHero'
export default function Page() {
  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <DashHeader/>
      <DashHero/>
    </div>
  )
}
