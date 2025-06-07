"use client"
import Container from "./components/Container";
import Header from "./components/Header";
import Landing from "./components/Landing";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user, isLoading, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      router.replace("/dashboard");
    }
  }, [profile, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  if (!user) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <Landing />
      </div>
    );
  }

  // Show container for authenticated users without profile
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Container />
    </div>
  );
}