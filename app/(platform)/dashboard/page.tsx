import { ModeToggle } from '@/components/themes/theme-toggle'
import DashHeader from './components/DashHeader'
import StartupCard from './components/StartupCard'

// Mock data for startups - replace with actual data from your backend
const startups = [
  {
    id: "1",
    name: "TechCorp",
    description: "Innovative tech solutions for modern businesses",
    problem: "Businesses struggle with outdated technology infrastructure",
    solution: "Cloud-based platform that modernizes legacy systems",
    teamSize: 15,
    funding: 5000000,
    founderId: "founder-uuid-1",
    created_at: new Date(),
    location: "San Francisco, CA"
  },
  {
    id: "2",
    name: "GreenEnergy",
    description: "Sustainable energy solutions for homes and businesses",
    problem: "High energy costs and carbon footprint",
    solution: "AI-powered energy optimization system",
    teamSize: 8,
    funding: 3000000,
    founderId: "founder-uuid-2",
    created_at: new Date(),
    location: "Austin, TX"
  },
  {
    id: "3",
    name: "HealthTech",
    description: "Revolutionary healthcare monitoring system",
    problem: "Lack of real-time health monitoring for elderly care",
    solution: "IoT-based health monitoring platform",
    teamSize: 12,
    funding: 7500000,
    founderId: "founder-uuid-3",
    created_at: new Date(),
    location: "Boston, MA"
  }
]

export default function Page() {
  return (
    <div className="h-full flex flex-col p-4 gap-10">
      <DashHeader/>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  )
}
