import Container from "./comp/Container";
import Header from "./comp/Header";
export default function Page() {
  return (
      <div className="flex flex-col h-screen">
        <Header />
        <Container/>
      </div>
  );
}