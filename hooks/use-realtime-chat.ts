'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'

export interface ChatUser {
  name: string
  id?: string
}

export interface ChatMessage {
  id: string
  content: string
  createdAt: string
  user: ChatUser
}

interface UseRealtimeChatProps {
  roomName: string
  username: string
}

export function useRealtimeChat({ roomName, username }: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase.channel(`chat:${roomName}`)

    channel
      .on('presence', { event: 'join' }, () => {
        setIsConnected(true)
      })
      .on('presence', { event: 'leave' }, () => {
        setIsConnected(false)
      })
      .on('broadcast', { event: 'message' }, (payload) => {
        if (payload.payload && typeof payload.payload === 'object' && 'message' in payload.payload) {
          const message = payload.payload.message as ChatMessage
          setMessages((prev) => [...prev, message])
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user: { name: username },
            online_at: new Date().toISOString(),
          })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomName, username])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !isConnected) return

      const message: ChatMessage = {
        id: uuidv4(),
        content,
        createdAt: new Date().toISOString(),
        user: {
          name: username,
        },
      }

      // Store message in database
      try {
        const { error } = await supabase.from('messages').insert({
          id: message.id,
          content: message.content,
          room: roomName,
          user_name: username,
          created_at: message.createdAt,
        })

        if (error) {
          console.error('Error storing message:', error)
        }
      } catch (error) {
        console.error('Error storing message:', error)
      }

      // Broadcast message to channel
      await supabase.channel(`chat:${roomName}`).send({
        type: 'broadcast',
        event: 'message',
        payload: { message },
      })
    },
    [isConnected, roomName, username]
  )

  return {
    messages,
    sendMessage,
    isConnected,
  }
}
