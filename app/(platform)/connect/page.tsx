import React from 'react'
import ConnectHeader from './components/ConnectHeader'
import ConnectHero from './components/ConnectHero'
export default function page() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <ConnectHeader/>
      <ConnectHero/>
    </div>
  )
}
