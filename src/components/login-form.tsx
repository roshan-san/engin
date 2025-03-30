"use client";
import { Github } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

export default function Onboarding() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;
  const { handleSubmit, setValue ,watch} = useForm();
  const selectedType = watch("type");
  const selectedAF = watch("availableFor");   

  const handleLogin = async (provider: "github" | "google") => {
    try {
      await signIn(provider);
      toast.success("Logged in!");

      if (session?.user?.email) {
        const response = await axios.post(
          "http://localhost:4444/checkuser/",
          {
            email: session.user.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        if (data.exists) {
          toast.success("User exists, redirecting to dashboard...");
          router.push("/dashboard");
        } else {
          toast("First time registering");
          setStep(2);
        }
      } else {
        toast.error("Email not found.");
      }

    } catch (e) {
      console.error("Login error:", e);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = handleSubmit(async (data: any) => {
    console.log("Data submitted:", data);
    
    try {
      console.log(data);
      
      const response = await axios.post(
        "http://localhost:4444/createuser/",
        {
          ...data,
          email: session?.user?.email,
          peru: session?.user?.name,
          avatar: session?.user?.image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Onboarding complete!");
      router.push("/dashboard");
    } catch (error) {
      console.log("Error during onboarding:", error);
      
      toast.error("some err");
    }
  });

  const handleSignOut = async () => {
    await signOut( );
    router.push("/");
  };

  const handleChange = (name: string, value: any) => {
    setValue(name, value);
  };

  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl">
      <CardHeader className="pt-4 pb-2 px-4">
        <CardTitle className="text-lg">
          {step === 1
            ? "Log in to continue"
            : step === 2
            ? `Welcome, ${session?.user?.name || "User"}!`
            : "Complete Your Profile"}
        </CardTitle>
        <Progress value={(step / totalSteps) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="p-4">
        {step === 1 && (
          <div className="space-y-3 text-center">
            <p className="text-sm">Log in to continue your onboarding.</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLogin("github")}
            >
              <Github className="w-4 h-4 mr-2" />
              Login with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLogin("google")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Login with Google
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {session?.user?.image && (
                <img
                  src={session.user.image}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <p className="text-xl">What describes you best?</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                variant={selectedType === "creator/collaborator" ? "default" : "outline"}
                onClick={() => handleChange("type", "creator/collaborator")}
                className="text-xs h-auto py-1.5"
              >
                Creator/Collaborator
              </Button>
              <Button
                variant={selectedType=== "mentor" ? "default" : "outline"}
                onClick={() => handleChange("type", "mentor")}
                className="text-xs h-auto py-1.5"
              >
                Mentor
              </Button>
              <Button
                variant={selectedType === "investor" ? "default" : "outline"}
                onClick={() => handleChange("type", "investor")}
                className="text-xs h-auto py-1.5"
              >
                Investor
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <p className="text-sm">Choose an unique username</p>
            <Input
              placeholder="username"
              onChange={(e) => handleChange("username", e.target.value)}
              className="text-sm"
            />
            <p className="text-sm">Short description about yourself</p>
            <Input
              placeholder="bio"
              onChange={(e) => handleChange("bio", e.target.value)}
              className="text-sm"
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <p className="text-sm">What are your top skills?</p>
            <Input
              placeholder="Skills seperated by commas"
              onChange={(e) =>
                handleChange("skills", e.target.value.split(",").map((item) => item.trim()))
              }
              className="text-sm"
            />
            <p className="text-sm">What industries interest you?</p>
            <Input
              placeholder="Areas of Interest seperated by commas"
              onChange={(e) =>
                handleChange(
                  "areasofinterest",
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              className="text-sm"
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3">
            <p className="text-sm">Where are you from?</p>
            <Input
              placeholder="Enter your location"
              onChange={(e) => handleChange("location", e.target.value)}
              className="text-sm"
            />
            <p className="text-sm">How are you looking to contribute?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                variant={selectedAF=== "full-time" ? "default" : "outline"}
                onClick={() => handleChange("availableFor", "full-time")}
                className="text-xs"
              >
                Full-time
              </Button>
              <Button
                variant={selectedAF === "part-time" ? "default" : "outline"}
                onClick={() => handleChange("availableFor", "part-time")}
                className="text-xs"
              >
                Part-time
              </Button>
              <Button
                variant={selectedAF=== "contract" ? "default" : "outline"}
                onClick={() => handleChange("availableFor", "contract")}
                className="text-xs"
              >
                Contract
              </Button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-3">
            <p className="text-sm">Drop your professional profiles.</p>
            <Input
              placeholder="LinkedIn Profile"
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="GitHub Profile"
              onChange={(e) => handleChange("github", e.target.value)}
              className="text-sm"
            />
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step === 2 ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
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