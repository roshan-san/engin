import React from 'react'
import { getStartupById } from '@/app/(other-pages)/startup/actions'
export default async function page() {
  const startup = await getStartupById(id)
  return (
    <div>
      <h1>{startup?.name}</h1>
      <p>{startup?.description}</p>
      <p>{startup?.problem}</p>
      <p>{startup?.solution}</p>
      <p>{startup?.teamSize}</p>
      <p>{startup?.patent}</p>
      <p>{startup?.funding}</p>
    </div>
  )
}
