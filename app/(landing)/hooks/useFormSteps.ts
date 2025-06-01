import { useState } from "react";
import { profiles } from "@/lib/db/schema";

const MAX_STEPS = 6;

export const useFormSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<typeof profiles.$inferSelect>>({});

  const handleNext = (data: Partial<typeof profiles.$inferSelect>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < MAX_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const finalData = { ...formData, ...data };
      console.table(finalData);
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