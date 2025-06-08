import Header from "./components/Header";
import Landing from "./components/Landing";

export default function Page() {
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
     <Landing />
    </div>
  );
}