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

export default function UserTypeStep({ onNext, onPrevious }: StepProps) {

  const stepSchema = z.object({
    user_type: z.enum(["Creator/Collaborator", "Mentor", "Investor"] as const),
    employment_type: z.enum(["Full Time", "Part Time", "Contract"] as const)
  });

  const form = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      user_type: "Creator/Collaborator",
      employment_type: "Full Time"
    },
  });

  const onSubmit = (data: z.infer<typeof stepSchema>) => {
    onNext(data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">What best describes you?</h2>
      <p className="text-muted-foreground mb-8">Help us understand your role and availability to better match you with opportunities.</p>
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }
          }}
          className="space-y-6"
          tabIndex={0}
        >
          <FormField
            control={form.control}
            name="user_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Role</FormLabel>
                <FormDescription>Select the role that best represents your main focus</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Creator/Collaborator" className="flex items-center gap-2">
                      <FaUserCog className="text-primary" />
                      <div>
                        <div className="font-medium">Creator/Collaborator</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Mentor" className="flex items-center gap-2">
                      <FaUserGraduate className="text-primary" />
                      <div>
                        <div className="font-medium">Mentor</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Investor" className="flex items-center gap-2">
                      <FaUserTie className="text-primary" />
                      <div>
                        <div className="font-medium">Investor</div>
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
                <FormLabel>Preferred Work Type</FormLabel>
                <FormDescription>Select your preferred working arrangement</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full Time" className="flex items-center gap-2">
                      <FaBriefcase className="text-primary" />
                      <div>
                        <div className="font-medium">Full Time</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Part Time" className="flex items-center gap-2">
                      <FaClock className="text-primary" />
                      <div>
                        <div className="font-medium">Part Time</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Contract" className="flex items-center gap-2">
                      <FaFileContract className="text-primary" />
                      <div>
                        <div className="font-medium">Contract</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onPrevious}>
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


