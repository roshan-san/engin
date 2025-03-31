"use client";
import { auth } from "@/auth";
import StartupForm from "@/components/startup-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession(); // ✅ Use useSession at the top level
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return; // Wait until session is loaded
      if (!session?.user?.email) {
        setError("User email not found. Please log in.");
        setLoading(false);
        return;
      }
      console.log(session?.user?.email)

      try {
        const response = await axios.get("http://localhost:4444/getuser", {
          params: { email: session.user.email },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]); // ✅ Depend on session & status

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create startup</Button>
        </DialogTrigger>
        <DialogContent className="w-[900px] min-h-[400px] p-6 shadow-none border-none bg-transparent flex flex-row">
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Create Startup</DialogTitle>
            </VisuallyHidden>
          </DialogHeader>
            <StartupForm userId={userData.Id} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
