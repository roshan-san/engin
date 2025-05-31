"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-3"
        >
          What best describes you?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg"
        >
          Help us understand your role and availability
        </motion.p>
      </div>
      
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4">Select your primary role</h3>
          <div className="grid gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <motion.button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      selectedRole === role.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-lg">{role.title}</div>
                      <div className="text-sm text-muted-foreground">{role.description}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4">Select your work type</h3>
          <div className="grid gap-4">
            {workTypes.map((type) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  onClick={() => setSelectedWorkType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedWorkType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      selectedWorkType === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-lg">{type.title}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-between gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
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
            disabled={!selectedRole || !selectedWorkType}
            className="flex-1 h-12 text-lg"
          >
            Next
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}


