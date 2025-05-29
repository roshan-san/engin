'use client';

import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepProps } from "../forms/login-form";
import { profiles } from "@/lib/db/schema";
import { useForm } from "react-hook-form";
export default function SkillInterestStep({ handleNext, handlePrevious }: StepProps) {
  const stepSchema = z.object({
    skills: z.string().min(1, "Please enter at least one skill"),
    interests: z.string().min(1, "Please enter at least one interest"),
  });

  const form = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      skills: "",
      interests: "",
    },
  });

  const onSubmit = (data: z.infer<typeof stepSchema>) => {
    // Convert comma-separated strings to arrays
    const processedData: Partial<typeof profiles.$inferSelect> = {
      skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: data.interests.split(',').map(s => s.trim()).filter(Boolean),
    };
    handleNext(processedData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">What are your skills and interests?</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. JavaScript, React, Node.js" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interests (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Web Development, AI, Open Source" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
