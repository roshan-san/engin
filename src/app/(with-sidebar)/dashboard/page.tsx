import StartupForm from "@/app/(with-sidebar)/dashboard/_comp/startup-form";
import Header from "@/components/landing/header";

export default function Page() {

  return (
    <div className="mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>
      <StartupForm/>
      
    </div>
  );
}
