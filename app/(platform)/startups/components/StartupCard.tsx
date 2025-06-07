import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Startup } from "@/lib/db/schema"

interface StartupCardProps {
  startup: Startup
}

export default function StartupCard({ startup }: StartupCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{startup.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{startup.description}</p>
      </CardContent>
    </Card>
  )
}
