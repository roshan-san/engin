"use client";
import Header from "@/components/landing/header";
import { StartupForm } from "./_comp/startup-form";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  return (
    <div className="mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>
      <StartupForm founderEmail={email || ""}/>
    </div>
  );
}
