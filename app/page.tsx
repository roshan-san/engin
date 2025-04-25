"use client";

import LoginForm from "@/components/landing/login-form";
import LeftStuff from "@/components/landing/left-stuff";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

const Hero = () => {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center border-b border-accent">
        <div className="max-w-screen-xl flex flex-col lg:flex-row items-center justify-around gap-6 px-6 py-4 lg:py-0 w-full mx-auto">
          <LeftStuff />
          <div className="mt-7 max-w-md w-full bg-background shadow-md rounded-xl border border-border mx-auto">
           
          </div>
        </div>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default Hero;