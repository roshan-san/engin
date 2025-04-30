"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useStartup, StartupFormData } from "@/hooks/createStartup";

interface StartupFormProps {
  founderEmail: string;
}

const formSteps = [
  {
    id: "basic",
    title: "Startup Basics",
    fields: ["name", "description"],
    comment: "Let's start with the basics. What's your startup's name and what does it do?"
  },
  {
    id: "problem",
    title: "Problem & Solution",
    fields: ["problem", "solution"],
    comment: "Every great startup solves a problem. What's yours and how do you solve it?"
  },
  {
    id: "details",
    title: "Company Details",
    fields: ["industry", "location", "teamSize"],
    comment: "Tell us about your company's industry, location, and team size."
  },
  {
    id: "resources",
    title: "Resources & IP",
    fields: ["patent", "funding"],
    comment: "Do you have any patents or funding secured?"
  }
];

export function StartupForm({ founderEmail }: StartupFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const { createStartup, isPending, isSuccess } = useStartup();
  
  const progress = ((currentStep) / formSteps.length) * 100;

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      form.reset();
    setCurrentStep(0);
    }
  }, [isSuccess]);

  const form = useForm<StartupFormData>({
    defaultValues: {
      name: "",
      description: "",
      problem: "",
      solution: "",
      industry: "",
      location: "",
      teamSize: 1,
      patent: "",
      funding: 0,
      founderEmail: founderEmail,
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
    setCurrentStep(0);;
    }
  };

 
  const onSubmit = (values: StartupFormData) => {
    createStartup({
      ...values,
      founderEmail: founderEmail,
    });
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentFields = formSteps[currentStep].fields;
      const currentFieldIndex = currentFields.indexOf(e.currentTarget.id);
      
      if (currentFieldIndex < currentFields.length - 1) {
        const nextField = document.getElementById(currentFields[currentFieldIndex + 1]);
        if (nextField) nextField.focus();
      } else if (currentStep < formSteps.length - 1) {
        nextStep();
        setTimeout(() => {
          const firstField = document.getElementById(formSteps[currentStep + 1].fields[0]);
          if (firstField) firstField.focus();
        }, 100);
      } else {
        
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === formSteps.length - 1) {
      form.handleSubmit(onSubmit)(e);
    } else {
      nextStep();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="size-4" />
          Create Startup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{formSteps[currentStep].title}</DialogTitle>
          <p className="text-sm text-muted-foreground">{formSteps[currentStep].comment}</p>
          <Progress value={progress} className="mt-2" />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {formSteps[currentStep].fields.map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof StartupFormData}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </FormLabel>
                    <FormControl>
                      {field === "description" || field === "problem" || field === "solution" ? (
                        <Textarea
                          id={field}
                          placeholder={`Enter ${field}`}
                          className="min-h-[100px]"
                          onKeyDown={handleKeyDown}
                          {...formField}
                          disabled={isPending}
                        />
                      ) : field === "teamSize" || field === "funding" ? (
                        <Input
                          id={field}
                          type="number"
                          min={field === "teamSize" ? 1 : 0}
                          placeholder={`Enter ${field}`}
                          onKeyDown={handleKeyDown}
                          {...formField}
                          onChange={(e) => formField.onChange(Number(e.target.value))}
                          disabled={isPending}
                        />
                      ) : (
                        <Input
                          id={field}
                          placeholder={`Enter ${field}`}
                          onKeyDown={handleKeyDown}
                          {...formField}
                          disabled={isPending}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0 || isPending}
              >
                Back
              </Button>
              <Button 
                type="submit"
                disabled={isPending}
              >
                {currentStep === formSteps.length - 1 
                  ? (isPending ? "Creating..." : "Create Startup") 
                  : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
