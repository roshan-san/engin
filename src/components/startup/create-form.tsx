"use client";

import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

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

interface CreateFormProps {
  onClose: () => void;
}

const formSteps = [
  {
    id: "basic",
    title: "Basic Information",
    fields: ["name", "description", "industry", "location"],
  },
  {
    id: "problem",
    title: "Problem & Solution",
    fields: ["problem", "solution"],
  },
  {
    id: "details",
    title: "Additional Details",
    fields: ["teamSize", "patent", "funding"],
  },
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

export function CreateForm({ onClose }: CreateFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  
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
      toast({
        title: "Success",
        description: "Startup created successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create startup",
        variant: "destructive",
      });
    },
  });

  const handleChange = useCallback((field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a startup",
        variant: "destructive",
      });
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

  const renderField = (field: keyof FormData) => {
    switch (field) {
      case "description":
      case "problem":
      case "solution":
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Textarea
              id={field}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        );
      case "teamSize":
      case "funding":
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              type="number"
              value={formData[field]}
              onChange={(e) => handleChange(field, parseInt(e.target.value))}
              min={field === "teamSize" ? 1 : 0}
              required
            />
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              value={formData[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        );
    }
  };

  return (
    <Card className="fixed bottom-6 right-6 w-96 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{formSteps[currentStep].title}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
          aria-label="Close form"
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          {formSteps.map((step, index) => (
            <div
              key={step.id}
              className={`h-1 w-1/3 rounded-full ${
                index <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {formSteps[currentStep].fields.map((field) => (
              <div key={field}>{renderField(field as keyof FormData)}</div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-4">
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
              className="flex items-center gap-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
} 