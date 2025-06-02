"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Contact({ handleNext, handlePrevious }:any) {
  const [socials, setSocials] = useState({
    github: '',
    linkedin: '',
  });

  const handleSubmit = () => {
    handleNext(socials);
    window.location.reload();
  };

  const handleInputChange = (field: string, value: string) => {
    setSocials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
              <FaGithub className="text-primary w-5 h-5" />
              Github Profile
            </label>
            <Input 
              placeholder="https://github.com/username" 
              value={socials.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
              <FaLinkedinIn className="text-primary w-5 h-5" />
              LinkedIn Profile
            </label>
            <Input 
              placeholder="https://www.linkedin.com/in/username/" 
              value={socials.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="w-full p-4 flex justify-between gap-4 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handlePrevious}
          className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
        >
          Previous
        </Button>
        <Button 
          type="button"
          onClick={handleSubmit}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
