"use client"
import { useProfile } from '@/app/(landing)/register/hooks/useProfile';
import React from 'react'

export default function Page() {
  const { isLoading, profile } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </div>
  );
}
