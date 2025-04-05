"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { signIn, signOut, useSession ,} from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginForm(session: any) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;
  const { handleSubmit, setValue ,watch} = useForm();
  const selectedType = watch("type");
  const selectedAF = watch("availableFor");   

  const handleLogin = async (provider: "github" | "google") => {
    try {
      await signIn(provider);
      toast("Logging in!");
    } catch (e) {
      console.error("Login error:", e);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleFinish = handleSubmit(async (data: any) => {
    console.log("Data submitted:", data);
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
              <FaGithub />
              Login with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLogin("google")}
            >
              <FaGoogle/>
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
            <Button type="button" size="sm" onClick={() => setStep(step + 1)}>
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
