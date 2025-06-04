import Header from "../components/Header";
import ChatList from "./components/ChatList";
import { Suspense } from "react";
import { ChatListSkeleton } from "./components/ChatListLoading";

export default function page() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Message</Header>
      <Suspense fallback={<ChatListSkeleton />}>
        <ChatList />
      </Suspense>
      
    </div>
  )
}
