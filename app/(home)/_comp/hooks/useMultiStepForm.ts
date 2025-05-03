"use client"
import { useFormStore } from "../store/useFormStore";
import { useTransition } from "react";

export const useMultiStepForm = () => {
  const { handleNext, handlePrevious, handleFinalSubmit, isSubmitting, error } = useFormStore();
  const [isPending, startTransition] = useTransition();

  const submitForm = async (data: any) => {
    startTransition(async () => {
      try {
        await handleFinalSubmit(data);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    });
  };

  return {
    handleNext,
    handlePrevious,
    submitForm,
    isPending: isPending || isSubmitting,
    error,
    isError: !!error,
  };
}; 