import { GithubLoginButton } from "./buttons/GithubLogin";
import { GoogleLoginButton } from "./buttons/GoogleLogin";
export default function Landing() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 flex w-full items-center justify-center p-4">
        <div className="space-y-6">
          <div className=" flex flex-col justify-center items-center gap-2">
          <h1 className="text-left sm:text-center text-5xl font-bold bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text">
            Got an idea? Launch your startup today!
          </h1>
          <p className="text-lg text-muted-foreground">           
            Connect with founders, mentors, and investors to build your startup.
          </p>

          </div>
          <div className="p-4  border-2 flex justify-center gap-4 items-center">
            <GithubLoginButton/>
            <GoogleLoginButton/>
          </div>
        </div>
      </div>
    </div>
  );
} 