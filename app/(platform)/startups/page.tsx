"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { StartupCard } from "@/app/(platform)/_comp/StartupCard";

const ITEMS_PER_PAGE = 6;

export default function StartupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastStartupElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const supabase = createClient();

  const fetchStartups = async (pageNum: number, search: string = "") => {
    setLoading(true);
    try {
      const from = (pageNum - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase
        .from('startups')
        .select('*')
        .range(from, to)
        .order('created_at', { ascending: false });

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      if (pageNum === 1) {
        setStartups(data);
      } else {
        setStartups(prev => [...prev, ...data]);
      }
    } catch (error) {
      console.error('Error fetching startups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchStartups(1, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchStartups(page, searchQuery);
    }
  }, [page]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Startups</h1>
        <p className="text-muted-foreground">
          Discover and explore innovative startups in our network
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search startups..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Startups Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {startups.map((startup, index) => (
          <div
            key={startup.id}
            ref={index === startups.length - 1 ? lastStartupElementRef : null}
          >
            <StartupCard {...startup} />
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
