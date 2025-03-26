"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, ArrowUpRight } from "lucide-react";

interface FundingOpportunity {
  id: number;
  title: string;
  description: string;
  fundingType: string;
  amountRaised: number;
  targetAmount: number;
  investors: number;
}

const sampleFundingOpportunities: FundingOpportunity[] = [
  {
    id: 1,
    title: "AI Insights",
    description: "Advanced AI-driven data analytics platform",
    fundingType: "Seed Round",
    amountRaised: 250000,
    targetAmount: 500000,
    investors: 12
  },
  {
    id: 2,
    title: "GreenTech Solutions",
    description: "Sustainable urban energy infrastructure",
    fundingType: "Pre-seed",
    amountRaised: 75000,
    targetAmount: 250000,
    investors: 5
  }
];

export default function FundingPage() {
  const [selectedFunding, setSelectedFunding] = useState<FundingOpportunity | null>(null);

  const calculateProgressPercentage = (opportunity: FundingOpportunity) => {
    return (opportunity.amountRaised / opportunity.targetAmount) * 100;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Funding Opportunities</h1>
        <p className="text-muted-foreground">Discover and invest in promising startups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {sampleFundingOpportunities.map(opportunity => (
            <Card 
              key={opportunity.id} 
              className={`hover:shadow-lg transition-all ${
                selectedFunding?.id === opportunity.id ? 'border-primary' : ''
              }`}
              onClick={() => setSelectedFunding(opportunity)}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{opportunity.title}</CardTitle>
                <Badge variant="outline">{opportunity.fundingType}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {opportunity.description}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">
                    ${opportunity.amountRaised.toLocaleString()} raised
                  </span>
                  <span className="text-muted-foreground">
                    Target: ${opportunity.targetAmount.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={calculateProgressPercentage(opportunity)} 
                  className="mb-2" 
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {opportunity.investors} Investors
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Funding Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedFunding ? (
                <div className="space-y-4">
                  <h3 className="font-semibold">{selectedFunding.title}</h3>
                  <p className="text-muted-foreground">{selectedFunding.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Funding Type</p>
                      <p className="font-semibold">{selectedFunding.fundingType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Target Amount</p>
                      <p className="font-semibold">
                        ${selectedFunding.targetAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">//</p>
                      <p className="font-semibold">
                        ${selectedFunding.amountRaised.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">//</p>
                      <p className="font-semibold">{selectedFunding.investors}</p>
                    </div>
                  </div>
                  <Button className="w-full">//</Button>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  //
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}