import { createClient } from '@supabase/supabase-js'
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StartupForm } from "./_comp/StartupForm"
import { TeamTab } from "./_comp/TeamTab"
import { InvestorsTab } from "./_comp/InvestorsTab"
import { JobsTab } from "./_comp/JobsTab"
import { startups } from "@/db/schema"

type Startup = typeof startups.$inferSelect & {
  founder?: {
    username: string
    avatar_url: string
  }
}

export default async function StartupPage({ params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: { session } } = await supabase.auth.getSession()
  const userId = session?.user?.id

  const { data: startup } = await supabase
    .from('startups')
    .select(`
      *,
      founder:profiles (
        username,
        avatar_url
      )
    `)
    .eq('id', params.id)
    .single()

  if (!startup) {
    notFound()
  }

  const isOwner = userId === startup.founder_id

  const handleRefetch = async () => {
    // Revalidate the page data
    const { data: updatedStartup } = await supabase
      .from('startups')
      .select(`
        *,
        founder:profiles (
          username,
          avatar_url
        )
      `)
      .eq('id', params.id)
      .single()

    return updatedStartup
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