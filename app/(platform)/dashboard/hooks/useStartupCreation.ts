import { useState } from "react";
import { Startup } from "@/lib/db/schema";

export const useStartupCreation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [startupData, setStartupData] = useState<Partial<Startup>>({});

  const handleNext = (data: Partial<Startup>) => {
    setStartupData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const progress = (currentStep / 7) * 100;

  return {
    isOpen,
    setIsOpen,
    currentStep,
    startupData,
    handleNext,
    handlePrevious,
    progress
  };
}; 