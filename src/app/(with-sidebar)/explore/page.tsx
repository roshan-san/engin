'use client';

import { useState } from 'react';
import SearchFilters from '@/components/SearchFilters';
import StartupCard from '@/components/StartupCard';
import { useStartups } from '@/hooks/useStartups';
import { Loader2 } from 'lucide-react';

export default function ExplorePage() {
  const [filters, setFilters] = useState({});
  const { data: startups, isLoading, error } = useStartups(filters);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold text-destructive">Error loading startups</h2>
        <p className="text-sm text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Explore Startups</h1>
      </div>
      
      <SearchFilters onFilterChange={setFilters} />
      
      {startups?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <h2 className="text-xl font-semibold">No startups found</h2>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups?.map((startup: any) => (
            <StartupCard
              key={startup.id}
              id={startup.id}
              name={startup.name}
              description={startup.description}
              industry={startup.industry}
              location={startup.location}
              teamSize={startup.teamSize}
              funding={startup.funding}
              founder={startup.founder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
