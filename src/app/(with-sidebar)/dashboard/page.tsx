"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch startups on component mount
  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4444/startups');
      setStartups(response.data);
    } catch (error) {
      console.error('Error fetching startups:', error);
      toast.error('Failed to load startups');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      
      // Convert teamSize to number and funding to float
      const formattedData = {
        ...startupData,
        teamSize: parseInt(startupData.teamSize),
        funding: startupData.fundingRequired ? parseFloat(startupData.fundingRequired) : null,
        patent: startupData.patentInfo
      };
      
      const response = await axios.post('/api/startups', formattedData);
      
      // Add the new startup to the list
      setStartups([...startups, response.data]);
      
      toast.success("Startup created successfully!");
      
      // Reset form data
      setStartupData({
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
      
      setStep(1);
      setShowCreateStartupDialog(false);
    } catch (error) {
      console.error('Error creating startup:', error);
      toast.error('Failed to create startup. ' + (error.response?.data?.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStartupData({ ...startupData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/startups/${id}`);
      setStartups(startups.filter(startup => startup.id !== id));
      toast.success('Startup deleted successfully');
    } catch (error) {
      console.error('Error deleting startup:', error);
      toast.error('Failed to delete startup');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>

      {loading && <p className="text-center my-4">Loading...</p>}

      {/* Startups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {startups.map((startup) => (
          <Card key={startup.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{startup.name}</CardTitle>
              <p className="text-sm text-gray-500">{startup.industry}</p>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm">{startup.description}</p>
              <div className="mt-4 text-sm">
                <p><span className="font-medium">Team:</span> {startup.teamSize} members</p>
                <p><span className="font-medium">Location:</span> {startup.location}</p>
                <p><span className="font-medium">Funding Required:</span> ${startup.funding?.toLocaleString()}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 bg-gray-50 pt-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => handleDelete(startup.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {startups.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-gray-500">No startups yet. Create your first startup!</p>
        </div>
      )}

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
                {step === 1 && "Basic Information"}
                {step === 2 && "Problem & Solution"}
                {step === 3 && "Industry & Location"}
                {step === 4 && "Patents & Funding"}
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
                    <Label htmlFor="fundingRequired">Funding Required ($)</Label>
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
                  <Button 
                    onClick={handleFinish} 
                    size="sm" 
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Finish'}
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