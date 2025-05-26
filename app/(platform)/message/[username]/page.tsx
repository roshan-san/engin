"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "next/navigation"

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

export default function ChatPage() {
  const params = useParams()
  const username = params.username as string

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{username}</h2>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-end gap-2 max-w-[70%] ${message.sender === "You" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.avatar} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div className={`rounded-lg p-3 ${message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <p>{message.content}</p>
                <span className="text-xs opacity-70">{message.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input placeholder="Type a message..." />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  )
}
