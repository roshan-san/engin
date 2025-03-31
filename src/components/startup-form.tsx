"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function StartupForm( {userId} :{userId:number}) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const { handleSubmit, register } = useForm();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = handleSubmit(async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4444/createstartup/",
        {
          ...data,
          founderId: userId, 
        },
        {   
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Startup created successfully!");
      console.log(data)
    } catch (error) {
      console.error("Error creating startup:", error);
      toast.error("Failed to create startup. Please try again.");
    }
  });

  return (
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
            : step === 5
            ? "Funding"
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
            <Button onClick={handleFinish} size="sm">
              Finish
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}