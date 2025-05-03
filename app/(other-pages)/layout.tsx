import { LeftBar } from "./_comp/LeftBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex flex-1 overflow-hidden h-full">
        <LeftBar />
        <main className="flex-1 p-2 overflow-auto bg-background md:p-4 lg:p-6">
          <div className="container mx-auto max-w-7xl px-2 md:px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}   
