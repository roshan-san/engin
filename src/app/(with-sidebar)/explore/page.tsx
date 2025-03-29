"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Rocket } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Startup {
  id: number;
  name: string;
  description: string;
  founder: {
    Name: string;
    avatar: string | null;
    type: string;
  };
  industry: string;
  openRoles: string[];
}

interface StartupResponse {
  startups: Startup[];
}

async function fetchStartups(searchQuery: string, selectedIndustry: string): Promise<StartupResponse> {
  const url = `/api/startups?search=${searchQuery}&industry=${selectedIndustry}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['startups', searchQuery, selectedIndustry],
    queryFn: () => fetchStartups(searchQuery, selectedIndustry),
  });

  const industries = [
    'AI & Machine Learning',
    'Clean Energy',
    'SaaS',
    'FinTech',
    'Healthcare',
    'E-commerce'
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const filteredStartups = data?.startups || [];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Startups</h1>
        <p className="text-muted-foreground">Discover innovative startups looking for talent and investment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search startups by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={selectedIndustry}
          onValueChange={setSelectedIndustry}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map(industry => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.length > 0 ? (
          filteredStartups.map(startup => (
            <Card key={startup.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{startup.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{startup.description}</p>
                <div className="mb-4 flex items-center">
                  {startup.founder.avatar && (
                    <Image
                      src={startup.founder.avatar}
                      alt={`${startup.founder.Name}'s profile picture`}
                      width={40}
                      height={40}
                      className="rounded-full mr-2"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold">{startup.founder.Name}</span>
                    <span className="text-sm text-gray-500">{startup.founder.type}</span>
                  </div>
                  <Rocket className="ml-2 h-4 w-4 text-primary" />
                </div>
                <Badge variant="secondary" className="mb-4">{startup.industry}</Badge>
                <div>
                  <h4 className="font-semibold mb-2">Open Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {startup.openRoles.map(role => (
                      <Badge key={role} variant="outline">{role}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No startups found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}