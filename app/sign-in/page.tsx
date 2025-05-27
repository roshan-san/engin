import SignInButton from './_comp/signInButton'  
export default function LoginPage() {
    return (
        <div className="bg-linear-to-b from-muted to-background flex flex-1 min-h-screen">
            <form
                action=""
                className="m-auto h-fit w-full">
                <div className="p-6">
                    <div>
                        <h1 className="mt-6 text-balance text-xl font-semibold">
                            <span className="text-muted-foreground">Welcome to Engin!</span> Create an Account to Get Started
                        </h1>
                    </div>
                    <div className="mt-6 space-y-2">
                        <SignInButton provider={'github'}>
                          github
                        </SignInButton>
                    </div>      
                </div>
            </form>
        </div>
    )
}