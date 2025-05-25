"use client"
import { StepProps } from '../forms/login-form'
import { GoogleButton } from './oauth-buttons/google-button'
import { GithubButton } from './oauth-buttons/github-button'

const OAuthStep = ({ handleNext, handlePrevious, setStep }: StepProps) => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Welcome to Engin</h2>
        <p className="text-sm text-muted-foreground">Choose your preferred sign in method</p>
      </div>

      <div className="space-y-4">
        <GoogleButton setStep={setStep} />
        <GithubButton setStep={setStep} />
      </div>
    </div>
  )
}

export default OAuthStep