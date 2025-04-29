import { useState } from "react";
import { Profile } from "@/types";

export const useMultiStepForm = (totalSteps: number, onComplete: (data: Partial<Profile>) => void) => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<Partial<Profile>>({});

  const handleNext = async (data: Partial<Profile>) => {
    if (data) {
      setUserData(prev => ({ ...prev, ...data }));
    }
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      try {
        onComplete({ ...userData, ...data });
      } catch (err) {
        console.error('Error completing form:', err);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return {
    step,
    setStep,
    userData,
    handleNext,
    handlePrevious,
    progress
  };
}; 