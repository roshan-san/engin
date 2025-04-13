"use client";
import { useSession } from "next-auth/react";
import { PendingConnections } from "./_comp/pending-connections";
import { DashboardStats } from "./_comp/dashboard-stats";
import { StartupForm } from "./_comp/startup-form";

export default function Page() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  return (
    <div className="mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-8">

          <DashboardStats />
        </div>
        
        <div className="w-full md:w-80 lg:w-96">
          <PendingConnections />
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 pb-16 md:pb-6 z-10">
        <StartupForm founderEmail={email || ""}/>
      </div>
    </div>
  );
}
