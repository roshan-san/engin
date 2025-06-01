"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTools, FaHeart, FaPlus, FaTimes } from "react-icons/fa";

export default function Skill({ handleNext, handlePrevious }: any) {
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    handleNext({
      skills,
      interests
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-full py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">
          Your Skills & Interests
        </h2>
        <p className="text-muted-foreground text-lg">
          Help us understand your expertise and what excites you
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
            <FaTools className="text-primary" />
            Skills
          </label>
          <div className="flex gap-2">
            <Input 
              placeholder="Add a skill" 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="h-14 text-lg rounded-xl"
            />
            <Button
              type="button"
              onClick={addSkill}
              className="h-14 px-4 rounded-xl"
            >
              <FaPlus className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="hover:text-destructive transition-colors"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
            <FaHeart className="text-primary" />
            Interests
          </label>
          <div className="flex gap-2">
            <Input 
              placeholder="Add an interest" 
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addInterest();
                }
              }}
              className="h-14 text-lg rounded-xl"
            />
            <Button
              type="button"
              onClick={addInterest}
              className="h-14 px-4 rounded-xl"
            >
              <FaPlus className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
              >
                {interest}
                <button
                  onClick={() => removeInterest(index)}
                  className="hover:text-destructive transition-colors"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between gap-4 pt-8 mt-auto">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handlePrevious}
          className="flex-1 h-12 text-lg"
        >
          Previous
        </Button>
        <Button 
          type="button"
          onClick={handleSubmit}
          className="flex-1 h-12 text-lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
