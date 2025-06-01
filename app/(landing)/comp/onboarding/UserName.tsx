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
    <div className="w-full max-w-2xl mx-auto flex flex-col h-full py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">
          Tell Us About Yourself
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose a username and write a short bio to introduce yourself
        </p>
      </div>
      
      <div className="space-y-8 w-full">
        <div className="space-y-6">
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
        
        <div className="flex justify-between gap-4 pt-6">
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
    </div>
  );
}
