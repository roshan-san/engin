"use client"
import { Progress } from "@/components/ui/progress";
import { useFormSteps } from "./hooks/useFormSteps";

import UserType from "./onboarding/UserType";
import UserBio from "./onboarding/UserBio";
import Contact from "./onboarding/Contact";
import Skill from "./onboarding/Skiill";
import LandingContent from "./onboarding/Landing";

export default function Container() {
  const { currentStep, handleNext, handlePrevious } = useFormSteps();

  const renderStep = () => {    
    return (
        <div className=" flex-1 p-4 flex flex-col gap-4">
          <Progress hidden={currentStep==0} value={(currentStep/5)*100}/>
          {(() => {
            switch (currentStep) {
              case 0:
                return <LandingContent onGetStarted={() => handleNext({})} />;
              case 1:
                return <UserType handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 2:
                return <UserBio handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 3:
                return <Skill handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 4:
                return <Contact handleNext={handleNext} handlePrevious={handlePrevious} />;
              default:
                return null;
            }
          })()}
        </div>
    );
  };

  return (
    renderStep()
  );
} 