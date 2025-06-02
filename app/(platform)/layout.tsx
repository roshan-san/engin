import { BottomBar } from "./components/BottomBar";
import { LeftBar } from "./components/LeftBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* LeftBar - hidden on mobile, visible on md screens and up */}
        <div className="hidden md:block w-20">
          <LeftBar />
        </div>
        {/* Main content */}
        <div className="flex-1">
          {children}
        </div>
      </div>

      <div className="md:hidden h-20">
        <BottomBar />
      </div>
    </div>
  );
}   
