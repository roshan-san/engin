import Container from "./comp/Container";
import Header from "./comp/Header";
import Landing from "./comp/Landing";
import { getUser } from "./actions";
export default async function Page() {
  const user = await getUser();
  
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