"use client"
import { Progress } from "@/components/ui/progress";
import { useFormSteps } from "./hooks/useFormSteps";
import UserName from "../register/onboarding/UserName";
import Role from "../register/onboarding/UserType";
import Skill from "../register/onboarding/Skiill";
import Contact from "../register/onboarding/Contact";
import WorkType from "../register/onboarding/WorkType";
import Location from "../register/onboarding/Location";

export default function Container() {
  const { currentStep, handleNext, handlePrevious } = useFormSteps();

  const renderStep = () => {    
    return (
        <div className="flex flex-col flex-1">
          <Progress hidden={currentStep==0} value={(currentStep/6)*100}/>
          {(() => {
            switch (currentStep) {
              case 1:
                return <UserName handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 2:
                return <Location handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 3:
                return <Role handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 4:
                return <Skill handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 5:
                return <WorkType handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 6:
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