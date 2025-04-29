"use client"
import { useState } from "react";
import { useMutation } from '@tanstack/react-query'
import { Profile } from "@/types";
import { Progress } from "@/components/ui/progress";
import UserSocialsStep from "./steps/user-socials-step"; 
import UserTypeStep from "./steps/usertype-step";
import SkillInterestStep from "./steps/skill-interest-step";
import UserBioStep from "./steps/userbio-step";
import OauthStep from "./steps/oauth-step"; 
import { createProfile } from "@/app/actions";

const TOTAL_STEPS = 5;

export interface StepProps {
    onNext: (data: Partial<Profile>) => void;
    onPrevious: () => void;
    setStep?: (step: number) => void;
}

export default function LoginForm() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<Partial<Profile>>({});
  
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

  const handleNext = async (data: Partial<Profile>) => {
    if (data) {
      setUserData(prev => ({ ...prev, ...data }))
    }
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      try {
        createProfileMutation({ ...userData, ...data });
      } catch (err) {
        console.error('Error creating profile:', err);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

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
            <OauthStep  setStep={setStep} onNext={handleNext} onPrevious={handlePrevious} />
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