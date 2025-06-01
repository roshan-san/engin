"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";

export default function UserName({ handleNext, handlePrevious }: any) {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    handleNext({
      username,
    });
  };

  return (
    <div className="w-screen h-full items-center justify-evenly flex gap-4 flex-col">
        <h2 className="text-3xl text-center font-bold ">
          Choose Your Unique Username
        </h2>
      
        <div className="w-100">
          <div className="space-y-2">
            <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
              <FaUser className="text-primary" />
              Username
            </label>
            <Input 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
          </div>
        </div>
        
        <div className="w-100 p-3 border-2 flex justify-evenly gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevious}
            className="flex-1 h-12 text-lg"
          >
            Previous
          </Button>
          <Button 
            type="button"
            onClick={handleSubmit}
            className="flex-1 h-12 text-lg"
          >
            Next
          </Button>
        </div>
      </div>
  );
}
