"use client";

import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Building2, Lightbulb, Users, DollarSign, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface FormData {
  name: string;
  description: string;
  problem: string;
  solution: string;
  industry: string;
  location: string;
  teamSize: number;
  patent: string;
  funding: number;
}

const formSteps = [
  {
    id: "basic",
    title: "Startup Basics",
    icon: Building2,
    fields: ["name", "description"],
    comment: "Let's start with the basics. What's your startup's name and what does it do?"
  },
  {
    id: "problem",
    title: "The Problem",
    icon: Lightbulb,
    fields: ["problem", "solution"],
    comment: "Every great startup solves a problem. What's yours and how do you solve it?"
  },
  {
    id: "industry",
    title: "Industry & Location",
    icon: MapPin,
    fields: ["industry", "location"],
    comment: "Where does your startup operate? Tell us about your industry and location."
  },
  {
    id: "team",
    title: "Team & Resources",
    icon: Users,
    fields: ["teamSize", "funding"],
    comment: "How big is your team and what resources do you have?"
  },
  {
    id: "patent",
    title: "Intellectual Property",
    icon: Shield,
    fields: ["patent"],
    comment: "Do you have any patents or intellectual property? This helps protect your innovation."
  }
];

async function createStartup(data: FormData) {
  const response = await fetch("/api/startup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create startup");
  }

  return response.json();
}

export default function StartupForm() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    problem: "",
    solution: "",
    industry: "",
    location: "",
    teamSize: 1,
    patent: "",
    funding: 0,
  });

  const mutation = useMutation({
    mutationFn: createStartup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startups"] });
      toast.success("Startup created successfully!");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create startup");
    },
  });

  const handleChange = useCallback((field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("You must be logged in to create a startup");
      return;
    }
    mutation.mutate(formData);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const currentFields = formSteps[currentStep].fields;
      const currentIndex = currentFields.indexOf(e.currentTarget.id);
      
      if (currentIndex < currentFields.length - 1) {
        const nextField = document.getElementById(currentFields[currentIndex + 1]);
        nextField?.focus();
      } else if (currentStep < formSteps.length - 1) {
        nextStep();
      }
    }
  };

  const renderField = (field: keyof FormData) => {
    switch (field) {
      case "description":
      case "problem":
      case "solution":
        return (
          <div className="space-y-2">
            <Label htmlFor={field} className="text-sm font-medium text-muted-foreground">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Textarea
              id={field}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Enter ${field}`}
              required
              className="min-h-[100px] resize-none"
            />
          </div>
        );
      case "teamSize":
      case "funding":
        return (
          <div className="space-y-2">
            <Label htmlFor={field} className="text-sm font-medium text-muted-foreground">
              {field === "teamSize" ? "Team Size" : "Initial Funding ($)"}
            </Label>
            <Input
              id={field}
              type="number"
              value={formData[field]}
              onChange={(e) => handleChange(field, parseInt(e.target.value))}
              onKeyDown={handleKeyDown}
              min={field === "teamSize" ? 1 : 0}
              required
            />
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={field} className="text-sm font-medium text-muted-foreground">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={field}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          Create Startup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <Card className="w-full border-0 shadow-none">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = formSteps[currentStep].icon;
                return Icon && <Icon className="size-5 text-primary" />
              })()}
              <h2 className="text-xl font-semibold">{formSteps[currentStep].title}</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {formSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`h-1.5 w-1/5 rounded-full transition-colors ${
                      index <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {formSteps[currentStep].comment}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {formSteps[currentStep].fields.map((field) => (
                    <div key={field}>{renderField(field as keyof FormData)}</div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
                {currentStep === formSteps.length - 1 ? (
                  <Button
                    type="submit"
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Creating..." : "Create Startup"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}