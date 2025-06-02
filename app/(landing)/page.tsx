import Container from "./comp/Container";
import Header from "./comp/Header";
import Landing from "./comp/Landing";
import { getUser, checkProfile } from "./actions";
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