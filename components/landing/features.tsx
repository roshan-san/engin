"use client";
import React from 'react';
import { Users, Rocket, Lightbulb, Network, Users2 } from "lucide-react";
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';

const features = [
  {
    title: "Expert Guidance",
    tagline: "Learn from the best",
    details: "Connect with experienced industry leaders who guide you through your startup journey.",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Investment Access",
    tagline: "Fuel your growth",
    details: "Access a network of investors ready to fuel your startup's growth and success.",
    icon: Rocket,
    color: "bg-green-500/10 text-green-500"
  },
  {
    title: "Idea Realization",
    tagline: "From concept to company",
    details: "Transform your groundbreaking ideas into successful business ventures with structured guidance.",
    icon: Lightbulb,
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    title: "Networking",
    tagline: "Build valuable connections",
    details: "Connect within our thriving startup ecosystem of founders, mentors, and industry experts.",
    icon: Network,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Collaboration",
    tagline: "Create together",
    details: "Partner with like-minded innovators to create something extraordinary and disruptive.",
    icon: Users2,
    color: "bg-red-500/10 text-red-500"
  }
];

export default function Features() {
  return (
    <section
      id="features"
      className="max-w-screen-xl mx-auto w-full py-16 px-6"
    >
      <div className="text-center mb-12">
        <Badge className="mb-3">Features</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to succeed</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We provide all the tools and connections you need to turn your vision into reality.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.title} 
            className="opacity-0 translate-y-4 animate-fade-in-up"
            style={{ animationDelay: `${features.indexOf(feature) * 100}ms` }}
          >
            <Card className="h-full border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:translate-y-2 group">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="mb-2">{feature.tagline}</Badge>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.details}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}