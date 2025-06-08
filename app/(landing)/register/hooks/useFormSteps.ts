import { useState } from "react";
import { Profile} from "@/lib/db/schema";
import { createProfile } from "../server/actions";
const MAX_STEPS = 6;

export const useFormSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Profile>>({});

  const handleNext = (data: Partial<Profile>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < MAX_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const finalData = { ...formData, ...data } as Profile;
      console.table(finalData);
      createProfile(finalData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  

  return {
    currentStep,
    formData,
    handleNext,
    handlePrevious,
  };
}; 