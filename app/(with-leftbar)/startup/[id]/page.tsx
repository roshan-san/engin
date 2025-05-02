import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StartupForm } from "./_comp/StartupForm"
import { TeamTab } from "./_comp/TeamTab"
import { InvestorsTab } from "./_comp/InvestorsTab"
import { JobsTab } from "./_comp/JobsTab"
import { db } from "@/db"
import { startups, profiles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createClient } from "@/lib/supabase"

type Startup = typeof startups.$inferSelect & {
  founder?: {
    username: string
    avatar_url: string
  }
}

async function getStartup(id: string) {
  const startupData = await db.query.startups.findFirst({
    where: eq(startups.id, id),
    with: {
      founder: {
        columns: {
          username: true,
          avatar_url: true,
          id: true
        }
      }
    }
  })

  if (!startupData) {
    notFound()
  }

  return startupData
}

async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export default async function StartupPage({ params }: { params: { id: string } }) {
  const [startupData, user] = await Promise.all([
    getStartup(params.id),
    getCurrentUser()
  ])

  const isOwner = user?.id === startupData.founderId

  const startup: Startup = {
    ...startupData,
    founder: startupData.founder ? {
      username: startupData.founder.username,
      avatar_url: startupData.founder.avatar_url
    } : undefined
  }

  const handleRefetch = async (): Promise<void> => {
    // This function is used by JobsTab to refresh data
    // The actual implementation is handled by the JobsTab component
    return
  }

  return (
    <div className="container mx-auto py-8">
      <StartupForm startup={startup} isOwner={isOwner} />
      
      <Tabs defaultValue="team" className="mt-8">
        <TabsList>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team">
          <TeamTab startup={startup} isOwner={isOwner} />
        </TabsContent>
        
        <TabsContent value="investors">
          <InvestorsTab startup={startup} isOwner={isOwner} />
        </TabsContent>
        
        <TabsContent value="jobs">
          <JobsTab startup={startup} isOwner={isOwner} onRefetch={handleRefetch} />
        </TabsContent>
      </Tabs>
    </div>
  )
}