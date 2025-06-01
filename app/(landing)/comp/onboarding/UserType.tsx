"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaUserCog, FaUserGraduate, FaUserTie, FaBriefcase, FaClock, FaFileContract } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto flex flex-col h-full py-8"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-3">
          Choose Your Role
        </h2>
        <p className="text-muted-foreground text-lg">
          Select your primary role and preferred work type
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 flex-1"
        >
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
                <motion.label
                  key={role.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`flex items-center space-x-4 p-6 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedRole === role.id 
                      ? 'border-primary bg-primary/5 shadow-lg' 
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <RadioGroupItem value={role.id} id={role.id} className="mt-1" />
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className={`p-3 rounded-full transition-colors duration-200 ${
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
                </motion.label>
              );
            })}
          </RadioGroup>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 flex-1"
        >
          <h3 className="text-lg font-medium text-muted-foreground tracking-wide uppercase flex items-center gap-2">
            <FaBriefcase className="text-primary" />
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
                <motion.label
                  key={type.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`flex items-center space-x-4 p-6 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedWorkType === type.id 
                      ? 'border-primary bg-primary/5 shadow-lg' 
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className={`p-3 rounded-full transition-colors duration-200 ${
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
                </motion.label>
              );
            })}
          </RadioGroup>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-auto pt-8"
      >
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
      </motion.div>
    </motion.div>
  );
}


