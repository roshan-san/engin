"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaUserCog, FaUserGraduate, FaUserTie, FaBriefcase, FaClock, FaFileContract } from "react-icons/fa";

const roles = [
  {
    id: 'creator',
    title: 'Creator/Collaborator',
    icon: FaUserCog,
    description: 'Build and collaborate on projects'
  },
  {
    id: 'mentor',
    title: 'Mentor',
    icon: FaUserGraduate,
    description: 'Guide and support others'
  },
  {
    id: 'investor',
    title: 'Investor',
    icon: FaUserTie,
    description: 'Support promising projects'
  }
];

const workTypes = [
  {
    id: 'full-time',
    title: 'Full Time',
    icon: FaBriefcase,
    description: '40+ hours per week'
  },
  {
    id: 'part-time',
    title: 'Part Time',
    icon: FaClock,
    description: '20-30 hours per week'
  },
  {
    id: 'contract',
    title: 'Contract',
    icon: FaFileContract,
    description: 'Project-based work'
  }
];

export default function UserTypeStep({ handleNext, handlePrevious }:any) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('');

  const handleSubmit = () => {  
    handleNext({
      role: selectedRole,
      workType: selectedWorkType
    });
  };

  return (
    <div className="w-full flex flex-1 flex-col h-full">
      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        <div className="space-y-4 flex-1">
          <h3 className="text-lg font-medium text-muted-foreground tracking-wide uppercase">
            Select your primary role
          </h3>
          <RadioGroup 
            value={selectedRole} 
            onValueChange={setSelectedRole}
            className="grid gap-4"
          >
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <label
                  key={role.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedRole === role.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={role.id} id={role.id} className="mt-1" />
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        selectedRole === role.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium text-lg">{role.title}</div>
                      <div className="text-sm text-muted-foreground">{role.description}</div>
                    </div>
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>

        <div className="space-y-4 flex-1">
          <h3 className="text-lg font-medium text-muted-foreground tracking-wide uppercase">
            Select your preferred work type
          </h3>
          <RadioGroup 
            value={selectedWorkType} 
            onValueChange={setSelectedWorkType}
            className="grid gap-4"
          >
            {workTypes.map((type) => {
              const Icon = type.icon;
              return (
                <label
                  key={type.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedWorkType === type.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        selectedWorkType === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium text-lg">{type.title}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex-1 h-12 text-lg"
          >
            Previous
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedRole || !selectedWorkType}
            className="flex-1 h-12 text-lg"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}


