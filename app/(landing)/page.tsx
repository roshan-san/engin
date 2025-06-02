import Container from "./components/Container";
import Header from "./components/Header";
import Landing from "./components/Landing";
import { getUser, checkProfile } from "./server/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  
  if (user) {
    const hasProfile = await checkProfile(user.email || '');
    if (hasProfile) {
      redirect('/dashboard');
    }
  }
  
  return (
      <div className="flex flex-col h-screen">
        <Header />
        {
          user ? (
            <Container/>
          ) : (
            <Landing/>
          )
        }
      </div>
  );
}