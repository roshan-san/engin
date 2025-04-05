import {  Sidebar } from "@/components/app-navigation";
import Header from "@/components/landing/header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Header/>
    <div className="grid grid-cols-2">
      <div className=" h-">
        <Sidebar />
      </div>
        <div className="">
          {children}
        </div>
    </div>
    </div>
  )
}   
