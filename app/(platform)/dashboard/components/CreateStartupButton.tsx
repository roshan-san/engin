"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { FaPlus } from "react-icons/fa";
import { useStartupCreation } from "../hooks/useStartupCreation";
import Container from "./Container";

export default function CreateStartupButton() {
  const {
    isOpen,
    setIsOpen,
    currentStep,
    handleNext,
    handlePrevious,
    progress
  } = useStartupCreation();

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <FaPlus className="w-4 h-4" />
        Create Startup
      </Button>

      {/* Dialog for larger screens */}
      <div className="hidden md:block">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-2xl h-[80vh]">
            <Container
              currentStep={currentStep}
              progress={progress}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Drawer for mobile screens */}
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[90vh]">
            <Container
              currentStep={currentStep}
              progress={progress}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
