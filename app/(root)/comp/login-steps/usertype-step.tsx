"use client"
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaUserCog, FaUserGraduate, FaUserTie, FaBriefcase, FaClock, FaFileContract } from "react-icons/fa";
import { StepProps } from "../forms/login-form";
import { profiles } from "@/lib/db/schema";
import { motion } from "framer-motion";

export default function UserTypeStep({ handleNext, handlePrevious }: StepProps) {
  const stepSchema = z.object({
    user_type: z.enum(["Creator/Collaborator", "Mentor", "Investor"] as const),
    employment_type: z.enum(["Full-Time", "Part-Time", "Contract"] as const)
  });

  const form = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      user_type: "Creator/Collaborator",
      employment_type: "Full-Time"
    },
  });

  const onSubmit = (data: Partial<typeof profiles.$inferSelect>) => {
    handleNext(data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 max-w-2xl mx-auto w-full"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">What best describes you?</h2>
      <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Help us understand your role and availability to better match you with opportunities.</p>
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }
          }}
          className="space-y-4 sm:space-y-6"
          tabIndex={0}
        >
          <FormField
            control={form.control}
            name="user_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Primary Role</FormLabel>
                <FormDescription className="text-xs sm:text-sm">Select the role that best represents your main focus</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 sm:h-12">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Creator/Collaborator" className="flex items-center gap-2 py-2">
                      <FaUserCog className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Creator/Collaborator</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Mentor" className="flex items-center gap-2 py-2">
                      <FaUserGraduate className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Mentor</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Investor" className="flex items-center gap-2 py-2">
                      <FaUserTie className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Investor</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Preferred Work Type</FormLabel>
                <FormDescription className="text-xs sm:text-sm">Select your preferred working arrangement</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 sm:h-12">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-Time" className="flex items-center gap-2 py-2">
                      <FaBriefcase className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Full Time</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Part-Time" className="flex items-center gap-2 py-2">
                      <FaClock className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Part Time</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Contract" className="flex items-center gap-2 py-2">
                      <FaFileContract className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                      <div>
                        <div className="font-medium text-sm sm:text-base">Contract</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between pt-4 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePrevious}
              className="flex-1 h-11 sm:h-12 active:scale-[0.98]"
            >
              Previous
            </Button>
            <Button 
              type="submit"
              className="flex-1 h-11 sm:h-12 active:scale-[0.98]"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}


