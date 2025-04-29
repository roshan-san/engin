import { Profile } from "@/types";
import { Progress } from "@/components/ui/progress";
import OauthStep from "@/app/(home)/_comp/login-steps/oauth-step";
import UserBioStep from "@/app/(home)/_comp/login-steps/userbio-step";
import UserTypeStep from "@/app/(home)/_comp/login-steps/usertype-step";
import SkillInterestStep from "@/app/(home)/_comp/login-steps/skill-interest-step";
import UserSocialsStep from "@/app/(home)/_comp/login-steps/user-socials-step";
import { useMultiStepForm } from "@/app/(home)/_comp/hooks/useMultiStepForm";
import { useMutation } from '@tanstack/react-query';

const TOTAL_STEPS = 5;

export interface StepProps {
    onNext: (data: Partial<Profile>) => void;
    onPrevious: () => void;
    setStep?: (step: number) => void;
}

export default function LoginForm() {
  const { mutate: createProfileMutation, isPending, error } = useMutation({
    mutationFn: (data: Partial<Profile>) => createProfile(data),
    onSuccess: () => {
      console.log('Profile created successfully');
      // Handle success (e.g., redirect to dashboard)
    },
    onError: (error) => {
      console.error('Error creating profile:', error);
    }
  });

  const { step, setStep, handleNext, handlePrevious, progress } = useMultiStepForm(
    TOTAL_STEPS,
    (data) => createProfileMutation(data)
  );

  return (
    <div className="w-full">
      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {step + 1} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </div>
      
      <div className="relative">
        {step === 0 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <OauthStep setStep={setStep} onNext={handleNext} onPrevious={handlePrevious} />
          </div>
        )}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <UserBioStep onNext={handleNext} onPrevious={handlePrevious} />
          </div>
        )}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <UserTypeStep onNext={handleNext} onPrevious={handlePrevious} />
          </div>
        )}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <SkillInterestStep onNext={handleNext} onPrevious={handlePrevious} />
          </div>
        )}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <UserSocialsStep 
              onNext={handleNext} 
              onPrevious={handlePrevious} 
            />
          </div>
        )}
      </div>
    </div>
  );
}