"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGithub, FaLinkedin, FaLinkedinIn } from "react-icons/fa";

export default function Contact({ handleNext, handlePrevious }:any) {
  const [socials, setSocials] = useState({
    github: '',
    linkedin: '',
  });

  const handleSubmit = () => {
    handleNext(socials);
  };

  const handleInputChange = (field: string, value: string) => {
    setSocials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-screen h-full items-center justify-evenly flex gap-4 flex-col">
    <h2 className="text-3xl text-center font-bold ">
    Connect Your Socials
        </h2>
  
    <div className="w-100 ">
      <div className="space-y-2">
        <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
          <FaGithub className="text-primary" />
          Github Profile Link
        </label>

        <Input 
              placeholder="https://github.com/username" 
              value={socials.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
      </div>
    </div>
    <div className="w-100 ">
      <div className="space-y-2">
        <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
          <FaLinkedinIn className="text-primary" />
          Linkedin Profile Link
        </label>

        <Input 
              placeholder="https://www.linkedin.com/in/username/" 
              value={socials.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
      </div>
    </div>
    
    <div className="w-100 flex justify-evenly gap-4">
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
