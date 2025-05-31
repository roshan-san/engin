"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function OAuthStep({ handleNext, handlePrevious }:any) {
  const [isLoading, setIsLoading] = useState<'github' | 'google' | null>(null);

  const handleOAuth = async (provider: 'github' | 'google') => {
    setIsLoading(provider);
    try {
      // Here you would typically call your OAuth provider
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleNext({});
    } catch (error) {
      console.error(`Error with ${provider} auth:`, error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-3"
        >
          Connect Your Accounts
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg"
        >
          Link your accounts to get started
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <Button
          variant="outline"
          className="w-full h-14 text-lg flex items-center justify-center gap-3"
          onClick={() => handleOAuth('github')}
          disabled={isLoading !== null}
        >
          <FaGithub className="h-5 w-5" />
          {isLoading === 'github' ? 'Connecting...' : 'Continue with GitHub'}
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 text-lg flex items-center justify-center gap-3"
          onClick={() => handleOAuth('google')}
          disabled={isLoading !== null}
        >
          <FaGoogle className="h-5 w-5" />
          {isLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
        </Button>
      </motion.div>

      <motion.div 
        className="flex justify-between gap-4 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button 
          type="button" 
          variant="outline" 
          onClick={handlePrevious}
          className="flex-1 h-12 text-lg"
          disabled={isLoading !== null}
        >
          Previous
        </Button>
        <Button 
          type="button"
          onClick={() => handleNext({})}
          className="flex-1 h-12 text-lg"
          disabled={isLoading !== null}
        >
          Skip for now
        </Button>
      </motion.div>
    </motion.div>
  );
}