"use client"
import { useState } from "react";
import { profiles } from "@/lib/db/schema";
import { Progress } from "@/components/ui/progress";

import UserTypeStep from "./login-steps/UserType";
import UserBioStep from "./login-steps/userbio-step";
import UserSocialsStep from "./login-steps/user-socials-step";
import SkillInterestStep from "./login-steps/skill-interest-step";
import OAuthStep from "./login-steps/oauth-step";
import LandingContent from "./login-steps/Landing";

export default function Container() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<typeof profiles.$inferSelect>>({});

  const handleNext = (data: Partial<typeof profiles.$inferSelect>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Final form data:", { ...formData, ...data });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {    
    return (
        <div>
          {(() => {
            switch (currentStep) {
              case 0:
                return <LandingContent onGetStarted={() => handleNext({})} />;
              case 1:
                return <UserTypeStep handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 2:
                return <UserBioStep handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 3:
                return <SkillInterestStep handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 4:
                return <UserSocialsStep handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 5:
                return <OAuthStep handleNext={handleNext} handlePrevious={handlePrevious} />;
              default:
                return null;
            }
          })()}
        </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
          <Progress  hidden= {currentStep==0} value={(currentStep / 5) * 100}  />
          <div className="flex-1 flex flex-col">
            {renderStep()}
          </div>
    </div>
  );
} 