import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Startup } from "../types";
import axios from "axios";

interface JobsTabProps {
  startup: Startup;
  isOwner: boolean;
  onRefetch: () => void;
}

export function JobsTab({ startup, isOwner, onRefetch }: JobsTabProps) {
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isDeletingJob, setIsDeletingJob] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{
    id: number;
    title: string;
    description: string;
    requirements: string;
    skills: string[];
    experience: string;
    equity: number;
    type: string;
  } | null>(null);

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startup) return;
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const skills = (formData.get("skills") as string).split(",").map(skill => skill.trim());
      
      const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        requirements: formData.get("requirements"),
        skills,
        experience: formData.get("experience"),
        equity: parseFloat(formData.get("equity") as string),
        type: formData.get("type"),
        startupId: startup.id,
      };
      
      await axios.post("/api/job", data);
      
      toast.success("Job added successfully!");
      setIsAddingJob(false);
      onRefetch();
    } catch (error) {
      toast.error("Failed to add job. Please try again.");
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJobId) return;
    
    try {
      await axios.delete(`/api/job/${selectedJobId}`);
      
      toast.success("Job deleted successfully!");
      setIsDeletingJob(false);
      setSelectedJobId(null);
      onRefetch();
    } catch (error) {
      toast.error("Failed to delete job. Please try again.");
    }
  };

  const handleEditJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const skills = (formData.get("skills") as string).split(",").map(skill => skill.trim());
      
      const data = {
        id: selectedJob.id,
        title: formData.get("title"),
        description: formData.get("description"),
        requirements: formData.get("requirements"),
        skills,
        experience: formData.get("experience"),
        equity: parseFloat(formData.get("equity") as string),
        type: formData.get("type"),
      };
      
      const response = await axios.put(`/api/job`, data);
      
      if (response.status === 200) {
        toast.success("Job updated successfully!");
        setIsEditingJob(false);
        setSelectedJob(null);
        onRefetch();
      } else {
        throw new Error("Failed to update job");
      }
    } catch (error: any) {
      console.error("Error updating job:", error);
      const errorMessage = error.response?.data?.error || "Failed to update job. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleApply = async (jobId: number) => {
    try {
      await axios.post(`/api/job/${jobId}/apply`);
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Open Positions</h2>
        {isOwner && (
          <Dialog open={isAddingJob} onOpenChange={setIsAddingJob}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Position
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Position</DialogTitle>
                <DialogDescription>
                  Create a new job posting for your startup.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddJob}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" name="title" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Textarea id="description" name="description" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requirements" className="text-right">Requirements</Label>
                    <Textarea id="requirements" name="requirements" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skills" className="text-right">Skills</Label>
                    <Input id="skills" name="skills" className="col-span-3" required />
                    <p className="text-xs text-muted-foreground col-span-3 col-start-2">Separate skills with commas</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="experience" className="text-right">Experience</Label>
                    <Select name="experience" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="equity" className="text-right">Equity (%)</Label>
                    <Input id="equity" name="equity" type="number" step="0.1" min="0" max="100" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Type</Label>
                    <Select name="type" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Position</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {startup.jobs && startup.jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {startup.jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="mt-1">{job.type}</CardDescription>
                  </div>
                  <Badge variant="secondary">{job.experience}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <p className="text-sm text-muted-foreground">{job.requirements}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">{job.experience}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Equity</p>
                    <p className="font-medium">{job.equity}%</p>
                  </div>
                  {isOwner ? (
                    <div className="flex gap-2 w-full md:w-auto">
                      <Dialog open={isEditingJob && selectedJob?.id === job.id} onOpenChange={(open) => {
                        if (!open) {
                          setIsEditingJob(false);
                          setSelectedJob(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => {
                              setSelectedJob(job);
                              setIsEditingJob(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Position</DialogTitle>
                            <DialogDescription>
                              Update the job posting details.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleEditJob}>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">Title</Label>
                                <Input 
                                  id="title" 
                                  name="title" 
                                  defaultValue={job.title} 
                                  className="col-span-3" 
                                  required 
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Textarea 
                                  id="description" 
                                  name="description" 
                                  defaultValue={job.description} 
                                  className="col-span-3" 
                                  required 
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="requirements" className="text-right">Requirements</Label>
                                <Textarea 
                                  id="requirements" 
                                  name="requirements" 
                                  defaultValue={job.requirements} 
                                  className="col-span-3" 
                                  required 
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input 
                                  id="skills" 
                                  name="skills" 
                                  defaultValue={job.skills.join(", ")} 
                                  className="col-span-3" 
                                  required 
                                />
                                <p className="text-xs text-muted-foreground col-span-3 col-start-2">Separate skills with commas</p>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="experience" className="text-right">Experience</Label>
                                <Select name="experience" defaultValue={job.experience} required>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue defaultValue={job.experience} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="entry">Entry Level</SelectItem>
                                    <SelectItem value="mid">Mid Level</SelectItem>
                                    <SelectItem value="senior">Senior Level</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="equity" className="text-right">Equity (%)</Label>
                                <Input 
                                  id="equity" 
                                  name="equity" 
                                  type="number" 
                                  step="0.1" 
                                  min="0" 
                                  max="100" 
                                  defaultValue={job.equity} 
                                  className="col-span-3" 
                                  required 
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Type</Label>
                                <Select name="type" defaultValue={job.type} required>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue defaultValue={job.type} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="full-time">Full Time</SelectItem>
                                    <SelectItem value="part-time">Part Time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={isDeletingJob && selectedJobId === job.id} onOpenChange={(open) => {
                        if (!open) {
                          setIsDeletingJob(false);
                          setSelectedJobId(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => {
                              setSelectedJobId(job.id);
                              setIsDeletingJob(true);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Position</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this position? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {
                              setIsDeletingJob(false);
                              setSelectedJobId(null);
                            }}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteJob}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <Button 
                      className="w-full gap-2" 
                      onClick={() => handleApply(job.id)}
                    >
                      <Briefcase className="h-4 w-4" />
                      Apply Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No open positions</h3>
            <p className="text-muted-foreground mt-2">
              {isOwner 
                ? "Add positions to attract talent to your startup" 
                : "Check back later for new opportunities"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 