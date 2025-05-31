import { useState } from "react";
import { profiles } from "@/lib/db/schema";

export const useFormSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<typeof profiles.$inferSelect>>({});

  const handleNext = (data: Partial<typeof profiles.$inferSelect>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Final form data:", { ...formData, ...data });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
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