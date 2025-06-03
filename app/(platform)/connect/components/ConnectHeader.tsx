import { ModeToggle } from "@/components/themes/theme-toggle";
export default function ConnectHeader() {
  return (
<div className="w-full flex items-center justify-between">
          <span className="text-4xl uppercase font-bold text-primary tracking-wider">
            Connect
          </span>
           <ModeToggle />   
      </div>  )
}
