"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { startups } from "@/db/schema"
import { createClient } from '@supabase/supabase-js'

type Startup = typeof startups.$inferSelect & {
  founder?: {
    username: string
    avatar_url: string
  }
}

interface StartupFormProps {
  startup: Startup
  isOwner: boolean
}

export function StartupForm({ startup, isOwner }: StartupFormProps) {
  const [formData, setFormData] = useState<Startup>(startup)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleChange = (field: keyof Omit<Startup, 'founder' | 'created_at'>, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isOwner) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('startups')
        .update({
          name: formData.name,
          description: formData.description,
          problem: formData.problem,
          solution: formData.solution,
          teamSize: formData.teamSize,
          funding: formData.funding,
          patent: formData.patent
        })
        .eq('id', formData.id)

      if (error) throw error
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save startup:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={startup.founder?.avatar_url || "/placeholder-avatar.png"} alt={startup.name} />
            <AvatarFallback>{startup.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {isEditing ? (
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="text-2xl font-bold text-center"
              disabled={isSaving || !isOwner}
            />
          ) : (
            <CardTitle className="text-2xl font-bold text-center">{formData.name}</CardTitle>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            {isEditing ? (
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="min-h-[100px]"
                disabled={isSaving || !isOwner}
              />
            ) : (
              <p className="text-muted-foreground">{formData.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Problem</h3>
            {isEditing ? (
              <Textarea
                value={formData.problem}
                onChange={(e) => handleChange('problem', e.target.value)}
                className="min-h-[100px]"
                disabled={isSaving || !isOwner}
              />
            ) : (
              <p className="text-muted-foreground">{formData.problem}</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Solution</h3>
            {isEditing ? (
              <Textarea
                value={formData.solution}
                onChange={(e) => handleChange('solution', e.target.value)}
                className="min-h-[100px]"
                disabled={isSaving || !isOwner}
              />
            ) : (
              <p className="text-muted-foreground">{formData.solution}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Team Size</h3>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.teamSize}
                  onChange={(e) => handleChange('teamSize', parseInt(e.target.value))}
                  disabled={isSaving || !isOwner}
                />
              ) : (
                <p className="text-muted-foreground">{formData.teamSize} members</p>
              )}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Funding</h3>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.funding}
                  onChange={(e) => handleChange('funding', parseInt(e.target.value))}
                  disabled={isSaving || !isOwner}
                />
              ) : (
                <p className="text-muted-foreground">${formData.funding.toLocaleString()}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Patent</h3>
            {isEditing ? (
              <Input
                value={formData.patent}
                onChange={(e) => handleChange('patent', e.target.value)}
                disabled={isSaving || !isOwner}
              />
            ) : (
              <p className="text-muted-foreground">{formData.patent}</p>
            )}
          </div>

          {isOwner && (
            <div className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
} 