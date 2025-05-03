'use client';

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepProps } from "../forms/login-form";
import { profiles } from "@/lib/db/schema";
import { useMultiStepForm } from "../hooks/useMultiStepForm";

export default function UserSocialsStep({ handleNext, handlePrevious }: StepProps) {
  const { submitForm, isPending } = useMultiStepForm();

  const stepSchema = z.object({
    github_url: z.string().url().optional().or(z.literal("")),
    linkedin_url: z.string().url().optional().or(z.literal("")),
  });

  const form = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      github_url: "",
      linkedin_url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof stepSchema>) => {
    const processedData = {
      github_url: data.github_url || null,
      linkedin_url: data.linkedin_url || null,
    } as Partial<typeof profiles.$inferSelect>;
    await submitForm(processedData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Connect your social profiles</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="github_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Profile</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedin_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Complete"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
