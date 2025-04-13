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
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Dashboard Stats */}
          <DashboardStats />
        </div>
        
        {/* Side Panel - Pending Connections */}
        <div className="w-full md:w-80 lg:w-96">
          <PendingConnections />
        </div>
      </div>
      
      {/* Floating Create Startup Button */}
      <div className="fixed bottom-6 right-6">
        <StartupForm founderEmail={email || ""}/>
      </div>
    </div>
  );
}
