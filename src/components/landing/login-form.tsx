"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useMultiStepForm from "@/hooks/use-multistep";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

interface FormValues {
  username: string;
  peru: string;
  type: string;
  bio: string;
  location: string;
  skills: string[];
  areasofinterest: string[];
  availableFor: string;
  linkedin: string;
  github: string;
  email: string;
  avatar: string;
}

interface CheckUserResponse {
  exists: boolean;
  email?: string;
  image?: string;
  name?: string;
  user?: any;
  error?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const { handleSubmit, setValue, watch, register, getValues, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      skills: [],
      areasofinterest: []
    }
  });
  const { goToStep, isFirstStep, isLastStep, nextStep, prevStep, step } = useMultiStepForm(6);
  const selectedType = watch("type");
  const selectedAF = watch("availableFor");
  const [isLoading, setIsLoading] = useState(false);

  const { data: userData, isLoading: isCheckingUser, error: checkUserError } = useQuery<CheckUserResponse>({
    queryKey: ["check-user", userEmail],
    queryFn: async () => {
      if (!userEmail) return null;
      const response = await axios.get('/api/auth/check-user');
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      return response.data;
    },
    enabled: !!userEmail && status === 'authenticated',
    retry: false
  });

  const handleLogin = async (provider: "github" | "google") => {
    try {
      setIsLoading(true);
      await signIn(provider, { 
        callbackUrl: window.location.href,
        redirect: false 
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      const formValues = getValues();

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          username: formValues.username,
          peru: formValues.peru,
          type: formValues.type,
          avatar: session?.user?.image,
          bio: formValues.bio,
          location: formValues.location,
          skills: formValues.skills,
          areasofinterest: formValues.areasofinterest,
          availableFor: formValues.availableFor,
          linkedin: formValues.linkedin,
          github: formValues.github
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }

      toast.success('Profile created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    goToStep(1);
  };

  interface HandleChangeParams {
    name: keyof FormValues;
    value: string | string[];
  }

  const handleChange = (name: HandleChangeParams["name"], value: HandleChangeParams["value"]) => {
    setValue(name, value);
  };

  useEffect(() => {
    if (userData?.exists) {
      router.push('/dashboard');
    } else if (userData && !userData.exists && step === 1) {
      // Pre-fill form with session data
      setValue('email', userData.email || '');
      setValue('avatar', userData.image || '');
      setValue('peru', userData.name || '');
      nextStep();
    }
  }, [userData, router, step, nextStep, setValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    const currentElement = e.currentTarget;
    
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (currentElement instanceof HTMLButtonElement) {
        currentElement.click();
        if (!isLastStep) {
          nextStep();
          focusNextElement();
        }
        return;
      }

      // For inputs, move to next input or step
      const nextElement = getNextElement(currentElement.id);
      
      if (nextElement) {
        nextElement.focus();
      } else if (!isLastStep) {
        nextStep();
        focusNextElement();
      } else {
        handleFinish();
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextElement = getNextElement(currentElement.id);
      if (nextElement) nextElement.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevElement = getPrevElement(currentElement.id);
      if (prevElement) prevElement.focus();
    }
  };

  const focusNextElement = () => {
    setTimeout(() => {
      const firstElement = document.querySelector(`#step-${step + 1} input, #step-${step + 1} button`) as HTMLElement;
      if (firstElement) firstElement.focus();
    }, 100);
  };

  const getNextElement = (currentId: string): HTMLElement | null => {
    const elementMap: Record<string, string> = {
      'username': 'bio',
      'skills': 'areasofinterest',
      'linkedin': 'github',
      'creator-btn': 'mentor-btn',
      'mentor-btn': 'investor-btn',
      'location': 'full-time-btn',
      'full-time-btn': 'part-time-btn',
      'part-time-btn': 'contract-btn'
    };
    return document.getElementById(elementMap[currentId]) as HTMLElement;
  };

  const getPrevElement = (currentId: string): HTMLElement | null => {
    const elementMap: Record<string, string> = {
      'mentor-btn': 'creator-btn',
      'investor-btn': 'mentor-btn',
      'part-time-btn': 'full-time-btn',
      'contract-btn': 'part-time-btn',
      'full-time-btn': 'location'
    };
    return document.getElementById(elementMap[currentId]) as HTMLElement;
  };

  if (isCheckingUser) {
    return (
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-4 text-center">
          <p>Checking your account...</p>
        </CardContent>
      </Card>
    );
  }

  if (checkUserError) {
    return (
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-4 text-center">
          <p className="text-destructive mb-4">Error checking user status</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

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
        <Progress value={(step / 6) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="p-4">
        {step === 1 && (
          <div className="space-y-3 text-center">
            <p className="text-sm">Log in to continue your onboarding.</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLogin("github")}
              disabled={isCheckingUser}
            >
              <FaGithub className="mr-2" />
              Login with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleLogin("google")}
              disabled={isCheckingUser}
            >
              <FaGoogle className="mr-2" />
              Login with Google
            </Button>
          </div>
        )}

        {step === 2 && (
          <div id="step-2" className="space-y-2">
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
                id="creator-btn"
                variant={selectedType === "creator/collaborator" ? "default" : "outline"}
                onClick={() => handleChange("type", "creator/collaborator")}
                className="text-xs h-auto py-1.5"
                onKeyDown={handleKeyDown}
              >
                Creator/Collaborator
              </Button>
              <Button
                id="mentor-btn"
                variant={selectedType === "mentor" ? "default" : "outline"}
                onClick={() => handleChange("type", "mentor")}
                className="text-xs h-auto py-1.5"
                onKeyDown={handleKeyDown}
              >
                Mentor
              </Button>
              <Button
                id="investor-btn"
                variant={selectedType === "investor" ? "default" : "outline"}
                onClick={() => handleChange("type", "investor")}
                className="text-xs h-auto py-1.5"
                onKeyDown={handleKeyDown}
              >
                Investor
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div id="step-3" className="space-y-3">
            <p className="text-sm">Choose a unique username</p>
            <Input
              id="username"
              placeholder="username"
              {...register("username", { required: true })}
              className="text-sm"
              onKeyDown={handleKeyDown}
            />
            <p className="text-sm">Short description about yourself</p>
            <Input
              id="bio"
              placeholder="bio"
              {...register("bio")}
              className="text-sm"
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {step === 4 && (
          <div id="step-4" className="space-y-3">
            <p className="text-sm">What are your top skills?</p>
            <Input
              id="skills"
              placeholder="Skills separated by commas"
              onChange={(e) =>
                handleChange("skills", e.target.value.split(",").map((item) => item.trim()))
              }
              className="text-sm"
              onKeyDown={handleKeyDown}
            />
            <p className="text-sm">What industries interest you?</p>
            <Input
              id="areasofinterest"
              placeholder="Areas of Interest separated by commas"
              onChange={(e) =>
                handleChange(
                  "areasofinterest",
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              className="text-sm"
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {step === 5 && (
          <div id="step-5" className="space-y-3">
            <p className="text-sm">Where are you from?</p>
            <Input
              id="location"
              placeholder="Enter your location"
              {...register("location")}
              className="text-sm"
              onKeyDown={handleKeyDown}
            />
            <p className="text-sm">How are you looking to contribute?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button
                id="full-time-btn"
                variant={selectedAF === "full-time" ? "default" : "outline"}
                onClick={() => handleChange("availableFor", "full-time")}
                className="text-xs"
                onKeyDown={handleKeyDown}
              >
                Full-time
              </Button>
              <Button
                id="part-time-btn"
                variant={selectedAF === "part-time" ? "default" : "outline"}
                onClick={() => handleChange("availableFor", "part-time")}
                className="text-xs"
                onKeyDown={handleKeyDown}
              >
                Part-time
              </Button>
              <Button
                id="contract-btn"
                variant={selectedAF === "contract" ? "default" : "outline"}
                onClick={() => handleChange("availableFor", "contract")}
                className="text-xs"
                onKeyDown={handleKeyDown}
              >
                Contract
              </Button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div id="step-6" className="space-y-3">
            <p className="text-sm">Drop your professional profiles.</p>
            <Input
              id="linkedin"
              placeholder="LinkedIn Profile"
              {...register("linkedin")}
              className="text-sm"
              onKeyDown={handleKeyDown}
            />
            <Input
              id="github"
              placeholder="GitHub Profile"
              {...register("github")}
              className="text-sm"
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {!isFirstStep && (
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
              <Button type="button" size="sm" onClick={prevStep}>
                Back
              </Button>
            )}
            {!isLastStep ? (
              <Button type="button" size="sm" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button onClick={handleFinish} size="sm">
                Finish
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}