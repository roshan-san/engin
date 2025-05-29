import React from 'react'
import { GoogleLoginButton } from './_comp/GoogleLogin'
import { GithubLoginButton } from './_comp/GithubLogin'
import SignOutButton from './_comp/SignOut'

export default function page() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className="flex flex-col gap-4">
      <GithubLoginButton />
      <GoogleLoginButton />
      <SignOutButton/>
    </div>
    </div>
  )
}
