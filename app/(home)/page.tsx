import LeftStuff from "@/app/(home)/_comp/landing/left-stuff";
import Featuress from "@/app/(home)/_comp/landing/features";
import Footer from "@/app/(home)/_comp/landing/footer";
import Header from "@/app/(home)/_comp/landing/header";
import LoginForm from "./_comp/forms/login-form";

export default function Page() {

  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center border-b border-accent">
        <div className="max-w-screen-xl flex flex-col lg:flex-row items-center justify-around gap-6 px-6 py-4 lg:py-0 w-full mx-auto">
          <LeftStuff />
          <div className="mt-7 max-w-md w-full bg-background shadow-md rounded-xl border border-border mx-auto">
            <LoginForm/>
          </div>
        </div>
      </div>
      <Featuress />
      <Footer />
    </div>
  );
}