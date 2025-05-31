import { createClient } from '@/lib/supabase/server';

interface Message {
    id: number;
    chat_id: number;
    author_id: string;
    content: string;
}

interface Chat {
    id: number;
    users: {
        user: {
            email: string;
        };
    }[];
}

let messagesWatcher: any;
let allMessages: Message[] = [];

async function getAllMessages(chatId: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId);
    
    return { data: data as Message[] };
}

async function getAllChats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    // get all chats where the current user is a member
    const { data: chatIds } = await supabase
        .from('chats')
        .select('id, users:chats_users!inner(user_id)')
        .eq('users.user_id', user.id)

    if (!chatIds) return { data: [] };

    // get all chats with the user profiles
    return await supabase
        .from('chats')
        .select('*, users:chats_users!inner(user:profiles(email))')
        .in('id', chatIds.map((chat: { id: number }) => chat.id))
}

async function sendMessage(chatId: number, newMessage: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase.from("messages").insert([
        {
            chat_id: chatId,
            author_id: user.id,
            content: newMessage,
        },
    ]);
    return { data, error };
}

// Note: These lifecycle hooks need to be handled differently in Next.js
// You'll need to implement these using React hooks or Next.js specific patterns
// For now, I'll comment them out as they're not compatible with server actions
/*
onDestroy(() => {
    messagesWatcher?.unsubscribe();
});

onMount(async () => {
    ({ data: allMessages } = await getAllMessages());

    const supabase = await createClient();
    messagesWatcher = supabase
        .channel("custom-all-channel")
        .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, async () => {
            ({ data: allMessages } = await getAllMessages());
        })
        .subscribe();
});
*/

async function createChatWithUser(newUserEmail: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    const {data: otherUser} = await supabase
        .from('profiles')
        .select('id')
        .eq('email', newUserEmail)
        .single()

    if (otherUser) {
        const {data: chat} = await supabase
            .from('chats')
            .insert({})
            .select()
            .single()

        const {data, error} = await supabase
            .from('chats_users')
            .insert([
                {
                    chat_id: chat.id,
                    user_id: user.id
                },
                {
                    chat_id: chat.id,
                    user_id: otherUser.id
                }]
            )
        return { data, error };
    }
    return { data: null, error: new Error("User not found") };
}   