"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from "@/components/ui/drawer";
import { FaPlus } from "react-icons/fa";
import Container from "../Container";

export default function CreateStartupButton() {
  return (
    <>
      {/* Dialog for larger screens */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <FaPlus className="w-4 h-4" />
              Create Startup
            </Button>
          </DialogTrigger>
          <DialogContent className="w-2xl h-[80vh]">
            <DialogTitle>Create New Startup</DialogTitle>
            <DialogDescription>
              Fill out the form below to create your new startup profile.
            </DialogDescription>
            <Container />
          </DialogContent>
        </Dialog>
      </div>

      {/* Drawer for mobile screens */}
      <div className="md:hidden fixed bottom-20 right-10 z-50">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="flex items-center justify-center w-10 h-10 p-0">
              <FaPlus className="w-4 h-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>Create New Startup</DrawerTitle>
              <DrawerDescription>
                Fill out the form below to create your new startup profile.
              </DrawerDescription>
            </DrawerHeader>
            <Container />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
