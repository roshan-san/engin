"use client";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function StartupForm() {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const { handleSubmit, register } = useForm();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  // Create mutation for submitting startup data
  const createStartupMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!session?.user?.email) {
        throw new Error("User email not found. Please log in.");
      }
      return axios.post("/create", data);
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Startup created successfully!");
    },
    onError: (error: any) => {
      console.error("Error creating startup:", error);
      toast.error(error.message || "Failed to create startup. Please try again.");
    }
  });

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = handleSubmit((data: any) => {
    createStartupMutation.mutate(data);
  });

  // If user is not authenticated, show error
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <div className="text-red-500">User not authenticated. Please log in.</div>;
  }

  if (!session?.user?.email) {
    return <div className="text-red-500">User email not found. Please log in.</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create startup</Button>
      </DialogTrigger>
      <DialogContent className="w-[900px] min-h-[400px] p-6 shadow-none border-none bg-transparent flex flex-row">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Create Startup</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
          <CardHeader className="pt-4 pb-2 px-4">
            <CardTitle className="text-lg">
              {step === 1
                ? "Startup Details"
                : step === 2
                  ? "Problem & Solution"
                  : step === 3
                    ? "Industry & Location"
                    : step === 4
                      ? "Team & Patent"
                      : "Finish"}
            </CardTitle>
            <Progress value={(step / totalSteps) * 100} className="mt-2" />
          </CardHeader>
          <CardContent className="p-4">
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-sm">Enter the name of your startup.</p>
                <Input
                  placeholder="Startup Name"
                  {...register("name", { required: true })}
                  className="text-sm"
                />
                <p className="text-sm">Provide a brief description of your startup.</p>
                <Input
                  placeholder="Description"
                  {...register("description", { required: true })}
                  className="text-sm"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <p className="text-sm">Describe the problem your startup addresses.</p>
                <Input
                  placeholder="Problem"
                  {...register("problem", { required: true })}
                  className="text-sm"
                />
                <p className="text-sm">Explain your startup's solution to this problem.</p>
                <Input
                  placeholder="Solution"
                  {...register("solution", { required: true })}
                  className="text-sm"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <p className="text-sm">Specify the industry your startup operates in.</p>
                <Input
                  placeholder="Industry"
                  {...register("industry", { required: true })}
                  className="text-sm"
                />
                <p className="text-sm">Enter your startup's location.</p>
                <Input
                  placeholder="Location"
                  {...register("location", { required: true })}
                  className="text-sm"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                <p className="text-sm">How big is your team?</p>
                <Input
                  placeholder="Team Size"
                  type="number"
                  {...register("teamSize", { required: true, valueAsNumber: true })}
                  className="text-sm"
                />
                <p className="text-sm">Do you have any patents? If so, please specify.</p>
                <Input
                  placeholder="Patent (if any)"
                  {...register("patent")}
                  className="text-sm"
                />
                <div className="space-y-3">
                  <p className="text-sm">Enter the funding amount in USD.</p>
                  <Input
                    placeholder="Funding (in USD)"
                    type="number"
                    {...register("funding", { required: true, valueAsNumber: true })}
                    className="text-sm"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              {step > 1 && (
                <Button type="button" size="sm" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}

              {step < totalSteps ? (
                <Button type="button" size="sm" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  onClick={handleFinish} 
                  size="sm" 
                  disabled={createStartupMutation.isPending}
                >
                  {createStartupMutation.isPending ? (
                    <><Loader2 className="animate-spin h-4 w-4 mr-2" /> Submitting...</>
                  ) : (
                    "Finish"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}