"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [showCreateStartupDialog, setShowCreateStartupDialog] = useState(false);
  const [startupData, setStartupData] = useState({
    name: '',
    description: '',
    industry: '',
    stage: '',
    fundingNeeded: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStartupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateStartup = () => {
    // TODO: Implement actual startup creation logic
    console.log('Creating startup:', startupData);
    setShowCreateStartupDialog(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>

      <Dialog open={showCreateStartupDialog} onOpenChange={setShowCreateStartupDialog}>
        <DialogTrigger asChild>
          <Button 
            variant="default" 
            className="fixed bottom-6 right-6 rounded-full shadow-lg z-50"
          >
            <Plus className="mr-2" /> Create Startup
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Startup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Startup Name</label>
              <Input 
                name="name"
                value={startupData.name}
                onChange={handleInputChange}
                placeholder="Enter startup name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Description</label>
              <Textarea 
                name="description"
                value={startupData.description}
                onChange={handleInputChange}
                placeholder="Describe your startup's mission"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm">Industry</label>
                <Input 
                  name="industry"
                  value={startupData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g., SaaS, FinTech"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Stage</label>
                <Input 
                  name="stage"
                  value={startupData.stage}
                  onChange={handleInputChange}
                  placeholder="e.g., Pre-seed, Seed"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm">Funding Needed</label>
              <Input 
                name="fundingNeeded"
                value={startupData.fundingNeeded}
                onChange={handleInputChange}
                placeholder="Amount of funding required"
                type="number"
              />
            </div>
            <Button 
              onClick={handleCreateStartup} 
              className="w-full"
            >
              Create Startup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}