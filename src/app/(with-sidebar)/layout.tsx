import {  Sidebar } from "@/components/app-navigation";
import Header from "@/components/landing/header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
    <div className='grid grid-cols-24'>
      <div className="col-span-1 h-screen">
        <Sidebar />
      </div>
        <div>
          {children}
        </div>
    </div>
    </div>
  )
}   
