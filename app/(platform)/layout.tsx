import { LeftBar } from "./_comp/LeftBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="w-16">
        <LeftBar/>
      </div>
        {children}
    </div>
  );
}   
