"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto flex flex-col h-full py-8"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-3">
          Connect Your Socials
        </h2>
        <p className="text-muted-foreground text-lg">
          Link your professional profiles to showcase your work
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
              <FaGithub className="text-primary" />
              GitHub Profile
            </label>
            <Input 
              placeholder="https://github.com/username" 
              value={socials.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
              <FaLinkedin className="text-primary" />
              LinkedIn Profile
            </label>
            <Input 
              placeholder="https://linkedin.com/in/username" 
              value={socials.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-between gap-4 pt-6"
        >
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
