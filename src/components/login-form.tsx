"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Onboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [userData, setUserData] = useState({
    type: "",
    location: "",
    skills: "",
    areasOfInterest: "",
    experience: "",
    linkedin: "",
    github: "",
    availableFor: "",
  });

  useEffect(() => {
    const registered = localStorage.getItem("isRegistered");
    if (registered === "true") {
      router.push("/dashboard"); 
    }
  }, [router]);

  useEffect(() => {
    if (status === "authenticated" && step === 1) { 
      setStep(2);
    }
  }, [status, step]);

  const handleLogin = async (provider: "github" | "google") => {
    try {
      await signIn(provider);
      toast.success("Logged in!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    }
  };

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = () => {
    toast.success("Onboarding complete!");
    localStorage.setItem("isRegistered", "true"); 
    router.push("/dashboard");
  };

  const handleSignOut = async () => {
    localStorage.removeItem("isRegistered"); 
    await signOut({ callbackUrl: "/" }); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>
            {step === 1
              ? "Log in to continue"
              : step === 2
              ? `Welcome, ${session?.user?.name || "User"}!`
              : "Complete Your Profile"}
          </CardTitle>
          <Progress value={(step / totalSteps) * 100} className="mt-2" />
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4 text-center">
              <p>Log in to continue your onboarding.</p>
              <Button variant="outline" className="w-full" onClick={() => handleLogin("github")}>
                Login with GitHub
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleLogin("google")}>
                Login with Google
              </Button>
            </div>
          ) : (
            <div>
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {session?.user?.image && (
                      <img
                        src={session.user.image}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full"
                      />
                    )}
                    <p className="text-lg font-medium">What describes you best?</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={userData.type === "creator" ? "default" : "outline"}
                      onClick={() => handleChange("type", "creator")}
                    >
                      Creator
                    </Button>
                    <Button
                      variant={userData.type === "collaborator" ? "default" : "outline"}
                      onClick={() => handleChange("type", "collaborator")}
                    >
                      Collaborator
                    </Button>
                    <Button
                      variant={userData.type === "investor" ? "default" : "outline"}
                      onClick={() => handleChange("type", "investor")}
                    >
                      Investor
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p>What are your top skills?</p>
                  <Input
                    placeholder="Skills (e.g., React, UI/UX, Marketing)"
                    onChange={(e) => handleChange("skills", e.target.value)}
                  />
                  <p>What industries interest you?</p>
                  <Input
                    placeholder="Areas of Interest"
                    onChange={(e) => handleChange("areasOfInterest", e.target.value)}
                  />
                  <p>Tell us about your experience.</p>
                  <Input
                    placeholder="Experience (e.g., 5 years in software)"
                    onChange={(e) => handleChange("experience", e.target.value)}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <p>Where are you from?</p>
                  <Input
                    placeholder="Enter your location"
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                  <p>How are you looking to contribute?</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={userData.availableFor === "full-time" ? "default" : "outline"}
                      onClick={() => handleChange("availableFor", "full-time")}
                    >
                      Full-time
                    </Button>
                    <Button
                      variant={userData.availableFor === "part-time" ? "default" : "outline"}
                      onClick={() => handleChange("availableFor", "part-time")}
                    >
                      Part-time
                    </Button>
                    <Button
                      variant={userData.availableFor === "contract" ? "default" : "outline"}
                      onClick={() => handleChange("availableFor", "contract")}
                    >
                      Contract
                    </Button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <p>Drop your professional profiles.</p>
                  <Input
                    placeholder="LinkedIn Profile"
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                  />
                  <Input
                    placeholder="GitHub Profile"
                    onChange={(e) => handleChange("github", e.target.value)}
                  />
                </div>
              )}

              <div className="flex justify-between mt-6">
                {step === 2 ? (
                  <Button type="button" variant="destructive" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Button type="button" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}

                {step < totalSteps ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleFinish}>
                    Finish
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}