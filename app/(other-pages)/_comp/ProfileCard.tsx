import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProfileCardProps {
  id: string
  name: string
  username: string
  avatarUrl?: string
  bio?: string
}

export function ProfileCard({ id, name, username, avatarUrl, bio }: ProfileCardProps) {
  return (
    <Card className="w-full transition-colors hover:bg-muted/50">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Link href={`/profile/${username}`} className="flex-shrink-0">
          <Avatar className="h-10 w-10 md:h-12 md:w-12">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="text-sm md:text-base">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/profile/${username}`} className="block">
            <CardTitle className="text-base md:text-lg truncate">{name}</CardTitle>
            <p className="text-sm text-muted-foreground truncate">@{username}</p>
          </Link>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-shrink-0 h-8 md:h-9 px-3 md:px-4"
        >
          <Link href={`/profile/${username}`}>View</Link>
        </Button>
      </CardHeader>
      {bio && (
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>
        </CardContent>
      )}
    </Card>
  )
} 