import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Profile } from "@/types";
import { StepProps } from "../login-form";
import { zodResolver } from "@hookform/resolvers/zod";
export default function UserBioStep({ onNext, onPrevious }: StepProps) {

  const step1schema = z.object({
    username: z.string().min(1,{message: "Username is required"}).regex(/^[A-Za-z]/, {
      message: "Must start with an alphabet",
    }),
    bio: z.string().min(1,{message: "Bio is required"}),
  })

  const form = useForm<z.infer<typeof step1schema>>({
    resolver: zodResolver(step1schema),
    defaultValues: {
      username: '',
      bio: '',
    },
  });

  const onSubmit = (data: Partial<Profile>) => {
    onNext(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
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
  )
}
