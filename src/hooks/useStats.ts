import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface DashboardStats {
  totalConnections: number;
  startups: number;
  activeProjects: number;
}

export const useDashboardStats = (email: string | undefined) => {
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats', email],
    queryFn: async () => {
      if (!email) return {
        totalConnections: 0,
        startups: 0,
        activeProjects: 0,
      };
      
      const response = await axios.get('/api/dashboard/stats');
      return response.data;
    },
    enabled: !!email,
  });

  return {
    stats: stats || {
      totalConnections: 0,
      startups: 0,
      activeProjects: 0,
    },
    isLoading,
    error,
  };
}; 