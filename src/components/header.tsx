import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b shadow-sm bg-background">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 text-transparent bg-clip-text">
          Engin
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
