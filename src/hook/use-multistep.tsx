import { useState } from 'react';

export default function useMultiStepForm(totalSteps: number) {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= totalSteps) {
      setStep(stepNumber);
    }
  };

  return {
    step,
    nextStep,
    prevStep,
    goToStep,
    totalSteps,
    isFirstStep: step === 1,
    isLastStep: step === totalSteps,
  };
}
