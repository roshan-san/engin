"use client"
interface Startup {
  id: number;
  name: string;
  description: string;
  problem: string;
  solution: string;
  industry: string;
  location: string;
  teamSize: number;
  patent: string | null;
  funding: number;
  founderId: number;
}

interface StartupApiResponse {
  startups: Startup[];
  totalCount: number;
}

async function fetchStartups(
  search: string,
  industry: string,
  location: string,
  page: number,
  pageSize: number = 20
): Promise<StartupApiResponse> {
  const params = new URLSearchParams({
    search,
    industry,
    location,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetch(`http://localhost:4444/startups?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<StartupApiResponse>;
}

import React, { useState, useEffect } from 'react';

function ExploreStartups() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchStartups(search, industry, location, page);
        if (page === 1) {
          setStartups(data.startups);
        } else {
          setStartups((prev) => [...prev, ...data.startups]);
        }
        setTotalCount(data.totalCount);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [search, industry, location, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
        <option value="">All Industries</option>
        {/* Populate with industry options */}
      </select>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">All Locations</option>
        {/* Populate with location options */}
      </select>
      {loading && <p>Loading...</p>}
      <ul>
        {startups.map((startup) => (
          <li key={startup.id}>
            <h3>{startup.name}</h3>
            <p>{startup.description}</p>
            {/* Display other startup data */}
          </li>
        ))}
      </ul>
      {startups.length < totalCount && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default ExploreStartups;