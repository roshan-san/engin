"use client"

import Container from "./components/Container";
import Header from "./components/Header";
import Landing from "./components/Landing";
import { useAuth } from "./hooks/useAuth";

export default function Page() {
  const { data, isLoading } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      ) : data?.user ? (
        <Container />
      ) : (
        <Landing />
      )}
    </div>
  );
}