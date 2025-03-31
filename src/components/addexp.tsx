// // components/AddExpDialog.tsx
// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// interface AddExpDialogProps {
//   userId: number; // Assuming you need the userId to associate the experience
//   onAddExperience: (experience: {
//     userId: number;
//     company: string;
//     role: string;
//     startDate: Date;
//     endDate: Date | null;
//     description: string | null;
//   }) => void;
// }

// export function AddExpDialog({ userId, onAddExperience }: AddExpDialogProps) {
//   const [company, setCompany] = useState("");
//   const [role, setRole] = useState("");
//   const [startDate, setStartDate] = useState<Date | undefined>();
//   const [endDate, setEndDate] = useState<Date | undefined>();
//   const [description, setDescription] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);

//   const handleAddExperience = () => {
//     if (startDate) {
//       onAddExperience({
//         userId,
//         company,
//         role,
//         startDate: startDate,
//         endDate: endDate || null,
//         description,
//       });
//       setOpen(false);
//       setCompany("");
//       setRole("");
//       setStartDate(undefined);
//       setEndDate(undefined);
//       setDescription(null);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Add Experience</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add User Experience</DialogTitle>
//           <DialogDescription>
//             Add a new experience entry for the user.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="company" className="text-right">
//               Company
//             </Label>
//             <Input
//               type="text"
//               id="company"
//               value={company}
//               onChange={(e) => setCompany(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="role" className="text-right">
//               Role
//             </Label>
//             <Input
//               type="text"
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="startDate" className="text-right">
//               Start Date
//             </Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant={"outline"}
//                   className={cn(
//                     "w-[240px] pl-3 text-left font-normal",
//                     !startDate && "text-muted-foreground"
//                   )}
//                 >
//                   {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={startDate}
//                   onSelect={setStartDate}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="endDate" className="text-right">
//               End Date
//             </Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant={"outline"}
//                   className={cn(
//                     "w-[240px] pl-3 text-left font-normal",
//                     !endDate && "text-muted-foreground"
//                   )}
//                 >
//                   {endDate ? format(endDate, "PPP") : <span>Pick a date (Optional)</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   mode="single"
//                   selected={endDate}
//                   onSelect={setEndDate}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="description" className="text-right">
//               Description
//             </Label>
//             <Input
//               type="text"
//               id="description"
//               value={description || ""}
//               onChange={(e) => setDescription(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="button" onClick={handleAddExperience}>
//             Add Experience
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }