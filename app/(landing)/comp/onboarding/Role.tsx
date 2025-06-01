"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaUserCog, FaUserGraduate, FaUserTie} from "react-icons/fa";

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

export default function Role({ handleNext, handlePrevious }:any) {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleSubmit = () => {  
    handleNext({
      role: selectedRole,
    });
  };

  return (
    <div className="w-full flex flex-col h-full p-2">   
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <div className="space-y-4 flex-1">
          <h3 className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
            <FaUserCog className="text-primary" />
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
                  className={`flex items-center space-x-4 p-6 rounded-xl border cursor-pointer transition-all duration-100 ${
                    selectedRole === role.id 
                      ? 'border-primary bg-primary/5 shadow-lg' 
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <RadioGroupItem value={role.id} id={role.id} className="mt-1" />
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className={`p-3 rounded-full transition-colors duration-100 ${
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
      </div>

      <div className="mt-auto pt-8">
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
            disabled={!selectedRole }
            className="flex-1 h-12 text-lg"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}


