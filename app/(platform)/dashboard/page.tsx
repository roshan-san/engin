import Header from '../components/Header'
import DashHero from './components/DashHero'
export default function Page() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Dashboard</Header>
      <DashHero/>
    </div>
  )
}
