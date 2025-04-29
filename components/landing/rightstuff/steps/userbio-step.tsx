import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Profile } from "@/types";
import { StepProps } from "../login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "@/lib/supabase/actions";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function UserBioStep({ onNext, onPrevious }: StepProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSigningOut, setIsSigningOut] = useState(false);

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

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      console.log('UserBioStep: Signing out user');
      startTransition(async () => {
        await signOut();
        toast.success('Signed out successfully');
        onPrevious();
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
        <p className="text-sm text-muted-foreground">Create your unique profile to get started</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} className="h-10" />
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
                    <Input placeholder="Tell us about yourself" {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleSignOut}
              className="w-full sm:w-auto"
              disabled={isSigningOut || isPending}
            >
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              {isSigningOut || isPending ? 'Signing out...' : 'Sign Out'}
            </Button>
            <Button 
              type="submit"
              className="w-full sm:w-auto"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
