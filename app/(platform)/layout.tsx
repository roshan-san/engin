import { BottomBar } from "./components/BottomBar";
import { LeftBar } from "./components/LeftBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="hidden md:block w-20">
          <LeftBar />
        </div>
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
