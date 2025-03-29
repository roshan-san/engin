"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function DashboardPage() {
  const [showCreateStartupDialog, setShowCreateStartupDialog] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [startupData, setStartupData] = useState({
    name: '',
    description: '',
    teamSize: '',
    problem: '',
    solution: '',
    industry: '',
    location: '',
    patentInfo: '',
    fundingRequired: '',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleFinish = () => {
    toast("Startup Created successfully!");
    console.log("Startup Data:", startupData); 
    setShowCreateStartupDialog(false);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setStartupData({ ...startupData, [name]: value });
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
        <DialogContent className="p-0">
          <VisuallyHidden>
            <DialogTitle>Create a Startup</DialogTitle>
          </VisuallyHidden>
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle>
                
              </CardTitle>
              <Progress value={((step - 1) / totalSteps) * 100} className="mt-2" />
            </CardHeader>
            <CardContent className="p-4">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Startup Name</Label>
                    <Input id="name" name="name" value={startupData.name} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={startupData.description} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input id="teamSize" type="number" name="teamSize" value={startupData.teamSize} onChange={handleChange} />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="problem">Problem</Label>
                    <Textarea id="problem" name="problem" value={startupData.problem} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="solution">Solution</Label>
                    <Textarea id="solution" name="solution" value={startupData.solution} onChange={handleChange} />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Textarea id="industry" name="industry" value={startupData.industry} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" value={startupData.location} onChange={handleChange} />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patentInfo">Patent Info</Label>
                    <Textarea id="patentInfo" name="patentInfo" value={startupData.patentInfo} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fundingRequired">Funding Required</Label>
                    <Input id="fundingRequired" name="fundingRequired" value={startupData.fundingRequired} onChange={handleChange} />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Back
                </Button>

                {step < totalSteps ? (
                  <Button type="button" size="sm" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleFinish} size="sm">
                    Finish
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}