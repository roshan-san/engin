"use client";
import StartupForm from "@/components/startup-form";
import { ThemeToggle } from "@/components/theme-toggle";


export default function Page() {

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        
      </div>
      <ThemeToggle/>
      <StartupForm/>
      
    </div>
  );
}
