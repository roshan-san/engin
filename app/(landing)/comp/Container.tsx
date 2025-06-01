"use client"
import { Progress } from "@/components/ui/progress";
import { useFormSteps } from "./hooks/useFormSteps";
import Landing from "./onboarding/Landing";
import UserName from "./onboarding/UserName";

export default function Container() {
  const { currentStep, handleNext, handlePrevious } = useFormSteps();

  const renderStep = () => {    
    return (
        <div className="flex flex-col flex-1">
          <Progress hidden={currentStep==0} value={(currentStep/5)*100}/>
          {(() => {
            switch (currentStep) {
              case 0:
                return <Landing onGetStarted={() => handleNext({})} />;
              case 1:
                return <UserName handleNext={handleNext} handlePrevious={handlePrevious} />;
              case 2:
                return < handleNext={handleNext} handlePrevious={handlePrevious} />;
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