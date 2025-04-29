'use client'
import { Button } from "@/components/ui/button";
import { StepProps } from "../login-form";
import { useTransition } from "react";
import { FaGithub } from "react-icons/fa";
import { signinWithGithub } from "@/lib/supabase/actions";

export default function OAuthStep({ setStep, onNext }: StepProps) {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = async () => {
    startTransition(async () => {
      try {
        await signinWithGithub();
      } catch (error) {
        console.error('Login failed:', error);
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Connect with your social account</h2>
      
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGithubLogin}
          disabled={isPending}
        >
          <FaGithub className="w-5 h-5" />
          {isPending ? 'Connecting...' : 'Continue with GitHub'}
        </Button>
      </div>
    </div>
  );
}
