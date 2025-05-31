import Container from "./comp/Container";
import { GithubLoginButton } from "./comp/buttons/GithubLogin";
import Header from "./comp/Header";

export default function Page() {
  return (
      <div className="min-h-screen flex flex-col">
        {/* header bar */}
        <Header/>
       <Container/>
      </div>
  );
}