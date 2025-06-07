"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Startup } from "@/lib/db/schema";
import { FaMoneyBillWave } from "react-icons/fa";
import { useStartupMutations } from "../../hooks/useStartupMutations";
import { useMultiForm } from "../../hooks/useMultiForm";
import { useRouter } from "next/navigation";

interface StepProps {
  handleNext: (data: Partial<Startup>) => void;
  handlePrevious: () => void;
}

const fundingSchema = z.object({
  funding: z.coerce.number().min(0, "Funding amount cannot be negative"),
});

type FundingFormValues = z.infer<typeof fundingSchema>;

export default function StartupFunding({ handleNext, handlePrevious }: StepProps) {
  const { createStartup, isCreating } = useStartupMutations();
  const { startupData } = useMultiForm();
  const router = useRouter();

  const form = useForm<FundingFormValues>({
    resolver: zodResolver(fundingSchema),
    defaultValues: {
      funding: 0,
    },
  });

  const handleSubmit = async (data: FundingFormValues) => {
    const isValid = await form.trigger();
    if (isValid) {
      try {
        await createStartup({
          ...startupData,
          funding: data.funding,
        });
        router.refresh();
      } catch (error) {
        console.error('Failed to create startup:', error);
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaMoneyBillWave className="text-primary w-5 h-5" />
          How much funding do you have?
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="funding"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="Enter funding amount" 
                      {...field}
                      className="h-14 text-lg rounded-xl"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="flex gap-4 w-full">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handlePrevious}
          className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
          disabled={isCreating}
        >
          Previous
        </Button>
        <Button 
          type="submit"
          onClick={form.handleSubmit(handleSubmit)}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Startup'}
        </Button>
      </div>
    </div>
  );
} 