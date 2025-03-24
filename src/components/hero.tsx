"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowBigDown } from "lucide-react";
import LoginForm from "./login-form";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
      <div className="max-w-screen-xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-8 gap-x-10 px-6 py-6 lg:py-0">
        <div className="max-w-xl">
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2] bg-gradient-to-r from-gray-400 to-gray-200 text-transparent bg-clip-text tracking-tight">
            Got an idea? Launch your startup today!
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg ">
            Welcome to Engin – the ultimate platform where bold ideas meet the right people to bring them to life.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none"
              onClick={scrollToFeatures} 
            >
              <ArrowBigDown className="!h-5 !w-5" /> View Features
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-auto max-w-md bg-background shadow-md rounded-xl border border-border">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;