import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { FaBriefcase, FaClock, FaFileContract } from "react-icons/fa";

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

export default function WorkType({ handleNext, handlePrevious }:any) {

    const [selectedWorkType, setSelectedWorkType] = useState<string>('');
    const handleSubmit = () => {  
        handleNext({
          workType: selectedWorkType
        });
      };

  return (
    <div className="w-full flex flex-col h-full p-2">   
      <div className="space-y-4 flex-1">
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
              <label
                key={type.id}
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
              </label>
            );
          })}
        </RadioGroup>
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
            disabled={!selectedWorkType }
            className="flex-1 h-12 text-lg"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
