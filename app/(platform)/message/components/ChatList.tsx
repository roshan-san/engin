import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getMyChats } from "../actions"
import Link from "next/link"
export default async function ChatList() {
  const { data: chats } = await getMyChats()
  
  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-4">
      {chats?.map((chat) => {
        const otherUser = chat.users[0].user
        const username = otherUser.name
        const email = otherUser.email

        return (
          <Link
            key={chat.id}
            href={`/message/${username.toLowerCase().replaceAll(' ', '-')}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <p className="font-medium h-4">{username}</p>
              <p className="text-sm text-muted-foreground h-3">{email}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
} 