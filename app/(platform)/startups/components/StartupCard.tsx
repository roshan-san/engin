import { useStartup } from '../hooks/useStartup'

interface StartupCardProps {
  startupId: string
}

export default function StartupCard({ startupId }: StartupCardProps) {
  const { startup, founder, isLoading } = useStartup(startupId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!startup || !founder) {
    return <div>Startup not found</div>
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">{startup.name}</h2>
      <p className="text-gray-600 mt-2">{startup.description}</p>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Founded by {founder.username}</p>
        <p className="text-sm text-gray-500">Location: {startup.location}</p>
        <p className="text-sm text-gray-500">Team Size: {startup.teamSize}</p>
      </div>
    </div>
  )
}
