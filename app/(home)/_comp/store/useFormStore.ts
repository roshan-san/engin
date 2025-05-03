import { create } from 'zustand';
import { profiles } from '@/lib/db/schema';
import { createProfile } from '@/app/(home)/actions';

type ProfileData = Partial<typeof profiles.$inferSelect>;

interface FormState {
  step: number;
  userData: ProfileData;
  progress: number;
  isSubmitting: boolean;
  error: Error | null;
  setStep: (step: number) => void;
  handleNext: (data: ProfileData) => void;
  handlePrevious: () => void;
  handleFinalSubmit: (data: ProfileData) => Promise<void>;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set, get) => ({
  step: 0,
  userData: {},
  progress: 0,
  isSubmitting: false,
  error: null,
  
  setStep: (step) => {
    set({ step });
    set({ progress: ((step + 1) / 5) * 100 });
  },

  handleNext: (data) => {
    const currentData = get().userData;
    const newData = { ...currentData, ...data };
    
    if (get().step < 4) {
      set({ 
        step: get().step + 1,
        userData: newData,
        progress: ((get().step + 2) / 5) * 100 
      });
    }
  },

  handlePrevious: () => {
    if (get().step > 0) {
      set({ 
        step: get().step - 1,
        progress: ((get().step) / 5) * 100 
      });
    }
  },

  handleFinalSubmit: async (data) => {
    try {
      set({ isSubmitting: true, error: null });
      const currentData = get().userData;
      const finalData = { ...currentData, ...data };
      
      // Use the server action to create the profile
      await createProfile(finalData as typeof profiles.$inferSelect);
      
      set({ isSubmitting: false });
    } catch (error) {
      set({ 
        isSubmitting: false, 
        error: error instanceof Error ? error : new Error('Failed to submit form') 
      });
      throw error;
    }
  },

  resetForm: () => {
    set({ 
      step: 0,
      userData: {},
      progress: 0,
      isSubmitting: false,
      error: null
    });
  }
})); 