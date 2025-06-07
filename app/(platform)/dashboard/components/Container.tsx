"use client";
import { Progress } from "@/components/ui/progress";
import StartupDescription from "./startup-creation/StartupDescription";
import StartupFunding from "./startup-creation/StartupFunding";
import StartupLocation from "./startup-creation/StartupLocation";
import StartupName from "./startup-creation/StartupName";
import StartupProblem from "./startup-creation/StartupProblem";
import StartupSolution from "./startup-creation/StartupSolution";
import StartupTeam from "./startup-creation/StartupTeam";
import { useMultiForm } from "../hooks/useMultiForm";

export default function Container() {
  const {
    currentStep,
    handleNext,
    handlePrevious,
    progress
  } = useMultiForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StartupName handleNext={handleNext} handlePrevious={handlePrevious} />;
      case 2:
        return <StartupLocation handleNext={handleNext} handlePrevious={handlePrevious} />;
      case 3:
        return <StartupDescription handleNext={handleNext} handlePrevious={handlePrevious} />;
      case 4:
        return <StartupProblem handleNext={handleNext} handlePrevious={handlePrevious} />;
      case 5:
        return <StartupSolution handleNext={handleNext} handlePrevious={handlePrevious} />;
      case 6:
        return <StartupTeam handleNext={handleNext} handlePrevious={handlePrevious} />;
      case 7:
        return <StartupFunding handleNext={handleNext} handlePrevious={handlePrevious} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Progress value={progress} className="mb-6" />
      {renderStep()}
    </div>
  );
} 