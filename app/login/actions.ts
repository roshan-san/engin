"use server"
import { createClient } from "@/lib/supabase/server"

export async function googleSignin() {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options:{
            redirectTo:process.env.URL!
        }
    })
}
export async function githubSignin() {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
        provider: "github",
        options:{
            redirectTo:process.env.URL!
        }
    })
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
}