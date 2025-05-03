"use client"
import { Progress } from "@/components/ui/progress";
import OauthStep from "@/app/(home)/_comp/login-steps/oauth-step";
import UserBioStep from "@/app/(home)/_comp/login-steps/userbio-step";
import UserTypeStep from "@/app/(home)/_comp/login-steps/usertype-step";
import SkillInterestStep from "@/app/(home)/_comp/login-steps/skill-interest-step";
import UserSocialsStep from "@/app/(home)/_comp/login-steps/user-socials-step";
import { profiles } from "@/lib/db/schema";
import { useFormStore } from "../store/useFormStore";

export interface StepProps {
    handleNext: (data: Partial<typeof profiles.$inferSelect>) => void;
    handlePrevious: () => void;
    setStep?: (step: number) => void;
}

export default function LoginForm() {
  const { step, progress, handleNext, handlePrevious, setStep } = useFormStore();

  return (
    <div className="w-full">
      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {step + 1} of 5</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </div>
      
      <div className="relative">
        {step === 0 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <OauthStep setStep={setStep} handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>
        )}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <UserBioStep handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>
        )}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <UserTypeStep handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>
        )}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <SkillInterestStep handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>
        )}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <UserSocialsStep 
              handleNext={handleNext} 
              handlePrevious={handlePrevious} 
            />
          </div>
        )}
      </div>
    </div>
  );
}