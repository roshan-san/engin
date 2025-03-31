"use client";
import StartupForm from "@/components/startup-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Page() {

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>
      <StartupForm/>
      
    </div>
  );
}
