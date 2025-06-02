import { BottomBar } from "./components/BottomBar";
import { LeftBar } from "./components/LeftBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* LeftBar - hidden on mobile, visible on md screens and up */}
      <div className="hidden md:block w-16">
        <LeftBar />
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>

      {/* BottomBar - visible on mobile, hidden on md screens and up */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomBar />
      </div>
    </div>
  );
}   
