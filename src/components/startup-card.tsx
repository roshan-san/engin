import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from 'lucide-react'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton';

export default function StartupCard() {

    const startup = {
        startupid:1,
        name: "EcoTrack - Sustainability Monitor",
        category: "Clean Energy",
        problem: "Difficulty tracking personal carbon footprint",
        solution: "AI-powered app that monitors and suggests eco-friendly alternatives",
        openroles: [
          {
            id: 1,  
            title: "Co-Founder & CTO",
            type: "Full-time",
            equity: "15-20%",
            tags: ["7+ years of technical leadership experience", "Strong background in AI/ML"]
          },
          {
            id: 2,
            title: "Chief Marketing Officer",
            type: "Full-time",
            equity: "8-12%",
            tags: ["5+ years in sustainability marketing", "Experience in B2C product launches"]
          },
          {
            id: 3,
            title: "Full Stack Developer",
            type: "Full-time",
            equity: "2-5%",
            tags: ["React & Node.js expertise", "Experience with real-time data processing"]
          }
        ],
        fouder:2,//profileid of the founder
        collaborators:[3,4,5],//profileids of the collaborators
        investors:[6,10,8],//profileids of the investors

      };
  return (
    
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Badge>{startup.category}</Badge>
            <p className="text-sm text-gray-500">Last seen {startup.lastSeen}</p>
          </div>
          <h2 className="text-2xl font-bold mt-2">{startup.name}</h2>
          <p className="text-gray-700">{startup.problem}</p>
          <p className="text-gray-700 font-semibold">Solution: {startup.solution}</p>
          <p className="text-sm text-gray-500 mt-2">📍 {startup.location}</p>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-bold">Open Roles</h3>
        {startup.openroles.map((role) => (
          <Card key={role.id} className="mt-4">
            <CardContent className="p-6 flex flex-col gap-2">
              <h4 className="text-lg font-semibold">{role.title}</h4>
              <p className="text-gray-500">{role.type} • {role.equity} equity</p>
              <div className="flex flex-wrap gap-2">
                {role.tags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>
              <Button className="mt-4 w-fit">View & Apply</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
