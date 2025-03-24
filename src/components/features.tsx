"use client"
import React, { useState } from 'react';
import { Users, Rocket, Lightbulb, Network, Users2 } from "lucide-react";
import { Card, CardContent, CardHeader } from './ui/card';

const features = [
  {
    title: "Expert guidance for your journey",
    details: "Connect with experienced industry leaders who guide you through your startup journey.",
    icon: Users
  },
  {
    title: "Fuel your startup's growth",
    details: "Access a network of investors ready to fuel your startup's growth and success.",
    icon: Rocket
  },
  {
    title: "Transform ideas into ventures",
    details: "Transform your groundbreaking ideas into successful business ventures.",
    icon: Lightbulb
  },
  {
    title: "Build valuable connections",
    details: "Build valuable connections within our thriving startup ecosystem.",
    icon: Network
  },
  {
    title: "Create something extraordinary",
    details: "Partner with like-minded innovators to create something extraordinary.",
    icon: Users2
  }
];

export default function Features() {
  return (
    <div
      id="features"
      className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6"
    >
      <div className="mt-8 xs:mt-14 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col border rounded-xl overflow-hidden shadow-none"
          >
            <CardHeader>
              <feature.icon />
              <h4 className="!mt-3 text-xl font-bold tracking-tight">
                {feature.title}
              </h4>
              <p className="mt-1 text-muted-foreground text-sm xs:text-[17px]">
                {feature.details}
              </p>
            </CardHeader>
            <CardContent className="mt-auto px-0 pb-0">
              <div className="bg-muted h-52 ml-6 rounded-tl-xl" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}