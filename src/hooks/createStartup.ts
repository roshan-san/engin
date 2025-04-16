import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export interface StartupFormData {
  name: string;
  description: string;
  problem: string;
  solution: string;
  industry: string;
  location: string;
  teamSize: number;
  patent: string;
  funding: number;
  founderEmail: string;
}

async function createStartup(data: StartupFormData) {
  const response = await axios.post("/api/startup", data);
  return response.data;
}

export function useStartup() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createStartup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startups"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      toast.success("Startup created successfully!");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create startup");
      } else {
        toast.error("Failed to create startup");
      }
    }
  });

  return {
    createStartup: mutation.mutate,
    isPending: mutation.isPending,
  };
} 