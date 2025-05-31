"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: number;
  chat_id: number;
  author_id: string;
  content: string;
  created_at: string;
}

interface Chat {
  id: number;
  users: {
    user: {
      email: string;
    };
  }[];
}

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const supabase = createClient();

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat);
      const channel = supabase
        .channel(`chat-${selectedChat}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `chat_id=eq.${selectedChat}`,
          },
          () => {
            loadMessages(selectedChat);
          }
        )
        .subscribe();

      return () => {
        channel.unsubscribe();
      };
    }
  }, [selectedChat]);

  async function loadChats() {
    const { data } = await supabase
      .from("chats")
      .select("*, users:chats_users!inner(user:profiles(email))");
    if (data) {
      setChats(data);
      if (data.length > 0 && !selectedChat) {
        setSelectedChat(data[0].id);
      }
    }
  }

  async function loadMessages(chatId: number) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });
    if (data) {
      setMessages(data);
    }
  }

  async function sendMessage() {
    if (!selectedChat || !newMessage.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("messages").insert([
      {
        chat_id: selectedChat,
        author_id: user.id,
        content: newMessage.trim(),
      },
    ]);
    setNewMessage("");
  }

  async function createChat() {
    if (!newUserEmail.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: otherUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", newUserEmail.trim())
      .single();

    if (otherUser) {
      const { data: chat } = await supabase
        .from("chats")
        .insert({})
        .select()
        .single();

      if (chat) {
        await supabase.from("chats_users").insert([
          {
            chat_id: chat.id,
            user_id: user.id,
          },
          {
            chat_id: chat.id,
            user_id: otherUser.id,
          },
        ]);
        setNewUserEmail("");
        loadChats();
      }
    }
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Chat List */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Chats</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="User email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <Button onClick={createChat}>New Chat</Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-accent ${
                      selectedChat === chat.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    {chat.users.map((u) => (
                      <div key={u.user.email} className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {u.user.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{u.user.email}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="col-span-9">
          <CardHeader>
            <CardTitle>
              {selectedChat &&
                chats
                  .find((c) => c.id === selectedChat)
                  ?.users.map((u) => u.user.email)
                  .join(", ")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100vh-12rem)]">
            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-2"
                  >
                    <Avatar>
                      <AvatarFallback>
                        {message.author_id[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-accent p-3 rounded-lg">
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
