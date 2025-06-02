import { Card } from '@/components/ui/card'
import { Users, DollarSign, Calendar, Building2, MapPin } from 'lucide-react'

interface Startup {
  id: string
  name: string
  description: string
  problem: string
  solution: string
  teamSize: number
  funding: number
  founderId: string
  created_at: Date
  location: string
}

interface StartupCardProps {
  startup: Startup
}

export default function StartupCard({ startup }: StartupCardProps) {
  return (
    <Card className="group relative p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">{startup.name}</h2>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{startup.teamSize}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{startup.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {startup.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-medium">${(startup.funding / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(startup.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 