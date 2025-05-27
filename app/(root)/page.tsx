import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themes/theme-toggle";
import Link from "next/link";

export default function Page() {
  return (
      <div className="min-h-screen border-4 border-accent">
        {/* header bar */}
        <div className="max-w-screen m-4 flex items-center justify-between">
          <span className="text-4xl font-bold text-primary tracking-wider hover:text-accent transition-colors duration-300">
            Engin
          </span>
          <ModeToggle />   
        </div>

        {/* main content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text tracking-tight">
            Got an idea? Launch your startup today!
          </h1>
          <p className="text-lg">
            Welcome to Engin – the ultimate platform where bold ideas meet the right people to bring them to life.
          </p>
        <Link href="/sign-up">
          <Button>
            Get started
          </Button>
        </Link>
        </div>
      </div>
  );
}