import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllChats } from "../actions"
import Link from "next/link"

interface Chat {
  id: number;
  users: {
    user: {
      email: string;
    };
  }[];
}

export default async function ChatList() {
  const { data: chats } = await getAllChats()

  if (!chats || chats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">No chats yet</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-4">
      {chats.map((chat) => {
        const otherUser = chat.users.find((user: { user: { email: string } }) => user.user.email !== 'current-user@example.com')
        const email = otherUser?.user.email || 'Unknown'
        const username = email.split('@')[0]

        return (
          <Link
            key={chat.id}
            href={`/message/${username}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <Avatar>
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{username}</p>
              <p className="text-sm text-muted-foreground truncate">{email}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
} 