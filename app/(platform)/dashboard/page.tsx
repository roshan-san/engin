import { ModeToggle } from '@/components/themes/theme-toggle'
import { Card } from '@/components/ui/card'
import { Users, DollarSign, Calendar, Lightbulb, Target, Rocket, Building2, MapPin } from 'lucide-react'
import DashHeader from './components/DashHeader'
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
          <Card 
            key={startup.id} 
            className="group relative overflow-hidden p-6 transition-all duration-300 
                     border border-border/50 hover:border-primary/50 
                     hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                     hover:-translate-y-1"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <h2 className="text-2xl font-bold text-primary group-hover:text-primary/90 transition-colors duration-300">{startup.name}</h2>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{startup.teamSize}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>{startup.location}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-medium">Problem:</p>
                    <p className="text-muted-foreground line-clamp-2">{startup.problem}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-primary mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-medium">Solution:</p>
                    <p className="text-muted-foreground line-clamp-2">{startup.solution}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm font-medium">Funding:</span>
                    <span className="text-sm text-green-600">${(startup.funding / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(startup.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-1">
                    <Rocket className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-xs text-primary">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
