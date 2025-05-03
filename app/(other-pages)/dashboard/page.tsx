export default async function Page() {
  return (
    <div className="mx-auto p-2 md:p-4 lg:p-6">
      <div className="flex justify-between items-center mb-3 md:mb-6 lg:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Your Dashboard</h1>
      </div>
      
      <div className="flex flex-col gap-3 md:flex-row md:gap-4 lg:gap-6">
        <div className="flex-1 space-y-3 md:space-y-4 lg:space-y-6">
          {/* <DashboardStats /> */}
        </div>
        
        <div className="w-full md:w-72 lg:w-80 xl:w-96">
          {/* <PendingConnections /> */}
        </div>
      </div>
      
      <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 pb-16 md:pb-6 z-10">
        {/* <StartupForm founderEmail={email || ""}/> */}
      </div>
    </div>
  );
}
