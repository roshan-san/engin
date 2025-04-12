import { LeftBar, } from "@/components/leftbar";
import Header from "@/components/landing/header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden h-full">
        <LeftBar />
        <main className="flex-1 p-6 overflow-auto bg-background pb-20 md:pb-6">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}   
