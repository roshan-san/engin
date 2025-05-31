"use client";
import { Button } from "@/components/ui/button";

interface LandingContentProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingContentProps) {
  return (
    <div className="min-h-138 p-5 flex flex-col items-center justify-center text-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text tracking-tight">
          Got an idea? Launch your startup today!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Connect with founders, mentors, and investors to build your startup.
        </p>
    </div>
      <Button 
        onClick={onGetStarted}
        size="lg"
        className="text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform"
      >
        Get started
      </Button>

      </div>
  );
} 