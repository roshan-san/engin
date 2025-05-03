"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"

// Dummy data for conversations
const conversations = [
  {
    id: 1,
    username: "johndoe",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "2m ago",
    unread: 2,
    avatar: "https://github.com/shadcn.png",
    online: true
  },
  {
    id: 2,
    username: "janesmith",
    name: "Jane Smith",
    lastMessage: "Can we meet tomorrow?",
    time: "1h ago",
    unread: 0,
    avatar: "https://github.com/shadcn.png",
    online: false
  },
  {
    id: 3,
    username: "teamproject",
    name: "Team Project",
    lastMessage: "Meeting at 3 PM",
    time: "2h ago",
    unread: 5,
    avatar: "https://github.com/shadcn.png",
    online: true
  }
]

// Dummy data for messages
const messages = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hey there! How's it going?",
    time: "2:30 PM",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 2,
    sender: "You",
    content: "I'm good! Working on the new project.",
    time: "2:32 PM",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 3,
    sender: "John Doe",
    content: "That's great! Need any help?",
    time: "2:33 PM",
    avatar: "https://github.com/shadcn.png"
  }
]

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const isChatPage = pathname !== "/message"

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      {/* Sidebar - Hidden on mobile when chat is selected */}
      <div className={`${isChatPage ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r bg-background`}>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-muted ${
                pathname === `/message/${conversation.username}` ? 'bg-muted' : ''
              }`}
              onClick={() => router.push(`/message/${conversation.username}`)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <Badge className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{conversation.name}</p>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${isChatPage ? 'flex' : 'hidden md:flex'} flex-1`}>
        {children}
      </div>
      
      {/* Empty State for Desktop */}
      {!isChatPage && (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  )
}

