"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaUser, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function UserBioStep({ handleNext, handlePrevious }: any) {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = () => {
    handleNext({
      username,
      bio
    });
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
          Tell Us About Yourself
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose a username and write a short bio to introduce yourself
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-8 w-full"
      >
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
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
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
              <FaInfoCircle className="text-primary" />
              Bio
            </label>
            <Input 
              placeholder="Tell us about yourself" 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="h-14 text-lg rounded-xl"
            />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
