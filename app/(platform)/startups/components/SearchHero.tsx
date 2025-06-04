import { Suspense } from 'react'
import Loading from './Loading'
import SearchResults from './SearchResults'

export default function SearchHero() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Suspense fallback={<Loading/>}>
        <SearchResults  />
      </Suspense>
    </div>
  )
}
