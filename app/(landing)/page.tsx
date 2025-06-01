import Container from "./comp/Container";
import Header from "./comp/Header";
import Landing from "./comp/Landing";
export default function Page() {
  return (
      <div className="flex flex-col h-screen">
        <Header />
        <Landing/>
        {/* <Container/> */}
      </div>
  );
}