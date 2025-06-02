import { ModeToggle } from '@/components/themes/theme-toggle'
import { Card } from '@/components/ui/card'
// Mock data for startups - replace with actual data from your backend
const startups = [
  {
    id: "1",
    name: "TechCorp",
    description: "Innovative tech solutions",
    industry: "Technology"
  },
  {
    id: "2",
    name: "GreenEnergy",
    description: "Sustainable energy solutions",
    industry: "Energy"
  },
  {
    id: "3",
    name: "GreenEnergy",
    description: "Sustainable energy solutions",
    industry: "Energy"
  }
]

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col flex-1 p-4 gap-10">
      <div className="max-w-screen m-4 flex items-center justify-between">
          <span className="text-4xl font-bold text-primary tracking-wider hover:text-accent transition-colors duration-300">
            Dashboard
          </span>
           <ModeToggle />   
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <Card key={startup.id} className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">{startup.name}</h2>
            <p className="">{startup.description}</p>
            <span className="bg-primary rounded-full px-3 py-1 font-semibold">
              {startup.industry}
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}
