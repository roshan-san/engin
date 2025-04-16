"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { toast } from "sonner";

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
import { useStartup, StartupFormData } from "@/hooks/use-startup";

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
  const progress = ((currentStep + 1) / formSteps.length) * 100;
  const { createStartup, isPending } = useStartup();

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

  const onSubmit = (values: StartupFormData) => {
    createStartup({
      ...values,
      founderEmail: founderEmail,
    });
    setOpen(false);
    form.reset();
  };

  const nextStep = () => {
    const currentFields = formSteps[currentStep].fields;
    const isValid = currentFields.every((field) => {
      const value = form.getValues(field as keyof StartupFormData);
      if (field === 'patent' || field === 'funding') {
        return value !== undefined && value !== null;
      }
      return value !== undefined && value !== null && value !== "";
    });
    
    if (isValid) {
      if (currentStep === formSteps.length - 1) {
        const formElement = document.querySelector('form');
        if (formElement) {
          const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
          formElement.dispatchEvent(submitEvent);
        }
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
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
        form.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }} className="space-y-4">
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
                        />
                      ) : (
                        <Input
                          id={field}
                          placeholder={`Enter ${field}`}
                          onKeyDown={handleKeyDown}
                          {...formField}
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
                disabled={currentStep === 0}
              >
                Back
              </Button>
              {currentStep === formSteps.length - 1 ? (
                <Button 
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Creating..." : "Create Startup"}
                </Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
