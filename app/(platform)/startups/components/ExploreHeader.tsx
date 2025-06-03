import { ModeToggle } from "@/components/themes/theme-toggle";
export default function ExploreHeader() {
  return (
<div className="w-full flex items-center justify-between">
          <span className="text-4xl uppercase font-bold text-primary tracking-wider">
            Explore
          </span>
           <ModeToggle />   
      </div>  )
}
