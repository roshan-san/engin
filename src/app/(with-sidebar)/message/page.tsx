"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";

interface Message {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
}

const sampleMessages: Message[] = [
  {
    id: 1,
    name: "person 1",
    lastMessage: "kkk",
    timestamp: "2m ago",
    unread: 2,
    avatar: ""
  },
  {
    id: 2,
    name: "person 2",
    lastMessage: "ohhh",
    timestamp: "1h ago",
    unread: 1,
    avatar: ""
  }
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);

  const filteredMessages = sampleMessages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Connect and collaborate with potential partners</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg">
          <div className="p-4 border-b relative">
            <Search className="absolute left-7 top-7 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {filteredMessages.map(message => (
            <div 
              key={message.id} 
              className={`flex items-center p-4 cursor-pointer hover:bg-accent ${
                selectedChat?.id === message.id ? 'bg-accent' : ''
              }`}
              onClick={() => setSelectedChat(message)}
            >
              <Avatar className="mr-4">
                <AvatarImage src={message.avatar} alt={message.name} />
                <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold">{message.name}</h4>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {message.lastMessage}
                </p>
              </div>
              {message.unread > 0 && (
                <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">
                  {message.unread}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="md:col-span-2 border rounded-lg flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{selectedChat.name}</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-center text-muted-foreground">
                  No messages yet. Start the conversation!
                </div>
              </div>
              <div className="p-4 border-t flex">
                <Input 
                  placeholder="Type a message..." 
                  className="mr-2 flex-1"
                />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}