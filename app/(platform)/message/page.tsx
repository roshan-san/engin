'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

type Message = {
  id: number;
  content: string;
  username: string;
  inserted_at: string;
};

type PostgresChangesPayload = {
  new: Message;
  old: Message | null;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
};

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();

    // Set up realtime subscription
    const channel = supabase.channel('public:messages');
    
    channel
      .on('broadcast', { event: 'message' }, (payload) => {
        if (payload.payload && typeof payload.payload === 'object' && 'message' in payload.payload) {
          const message = payload.payload.message as Message;
          setMessages((msgs) => [...msgs, message]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function fetchMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('inserted_at', { ascending: true });
    setMessages(data || []);
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !username.trim()) return;
    
    // Insert message into database
    const { data, error } = await supabase.from('messages').insert([{ 
      content: input, 
      username 
    }]).select();
    
    if (error) {
      console.error('Error sending message:', error);
      return;
    }
    
    // Broadcast message to channel
    if (data && data.length > 0) {
      await supabase.channel('public:messages').send({
        type: 'broadcast',
        event: 'message',
        payload: { message: data[0] }
      });
    }
    
    setInput('');
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 16 }}>
      <h2>Supabase Realtime Chat</h2>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Your name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', marginBottom: 8 }}
        />
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          height: 300,
          overflowY: 'auto',
          padding: 8,
          marginBottom: 8,
          background: '#fafafa',
        }}
      >
        {messages.map(msg => (
          <div key={msg.id} style={{ marginBottom: 6 }}>
            <b>{msg.username}:</b> {msg.content}
            <span style={{ color: '#888', fontSize: 10, marginLeft: 8 }}>
              {new Date(msg.inserted_at).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={!input.trim() || !username.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
