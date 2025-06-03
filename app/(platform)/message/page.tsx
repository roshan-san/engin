import Header from "../components/Header";
import MessageHero from "./components/MessageHero";

export default function page() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Message</Header>
         <MessageHero/>
    </div>
  )
}
