export default function Header() {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 text-transparent bg-clip-text">
          Engin
        </h1>
        <div className="flex items-center gap-2">
         
        </div>
      </div>
    </header>
  );
}
