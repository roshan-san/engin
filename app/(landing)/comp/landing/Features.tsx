import { Users, Rocket, Lightbulb, Network, Users as Users2, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const features = [
  {
    title: "Expert Guidance",
    description: "Connect with experienced industry leaders who guide you through your startup journey.",
    icon: Users
  },
  {
    title: "Investment Access",
    description: "Access a network of investors ready to fuel your startup's growth and success.",
    icon: Rocket
  },
  {
    title: "Idea Realization",
    description: "Transform your groundbreaking ideas into successful business ventures with structured guidance.",
    icon: Lightbulb
  },
  {
    title: "Networking",
    description: "Connect within our thriving startup ecosystem of founders, mentors, and industry experts.",
    icon: Network
  },
  {
    title: "Collaboration",
    description: "Partner with like-minded innovators to create something extraordinary and disruptive.",
    icon: Users2
  },
  {
    title: "Market Access",
    description: "Gain insights into market trends and opportunities to position your startup for success.",
    icon: BarChart
  }
];

export default function Features() {
  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center space-y-4 mb-12 sm:mb-16">
        <Badge className="mb-4 animate-fade-in">Features</Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Everything you need to succeed
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          We provide all the tools and connections you need to turn your vision into reality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <Card 
            key={feature.title} 
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}