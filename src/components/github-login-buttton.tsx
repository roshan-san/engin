
import { signIn } from "@/auth"
 
export default function GithubSignIN() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with github</button>
    </form>
  )
} 