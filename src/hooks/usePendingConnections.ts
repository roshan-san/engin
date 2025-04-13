import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface Connection {
  id: number;
  senderId: number;
  receiverId: number;
  status: "pending" | "accepted" | "rejected";
  sender: {
    peru: string;
    email: string;
    avatar: string;
  };
}

export const usePendingConnections = (email: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: pendingConnections, isLoading, error } = useQuery<Connection[]>({
    queryKey: ['pendingConnections', email],
    queryFn: async () => {
      if (!email) return [];
      const response = await axios.get(`/api/connection/pending?email=${email}`);
      return response.data;
    },
    enabled: !!email,
  });

  const acceptConnectionMutation = useMutation({
    mutationFn: async (connectionId: number) => {
      const response = await axios.post(`/api/connection/acceptreq`, { connectionId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingConnections'] });
      toast.success('Connection accepted');
    },
    onError: (error) => {
      console.error('Error accepting connection:', error);
      toast.error('Failed to accept connection');
    },
  });

  const rejectConnectionMutation = useMutation({
    mutationFn: async (connectionId: number) => {
      const response = await axios.post(`/api/connection/rejectreq`, { connectionId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingConnections'] });
      toast.success('Connection rejected');
    },
    onError: (error) => {
      console.error('Error rejecting connection:', error);
      toast.error('Failed to reject connection');
    },
  });

  const handleAcceptConnection = (connectionId: number) => {
    acceptConnectionMutation.mutate(connectionId);
  };

  const handleRejectConnection = (connectionId: number) => {
    rejectConnectionMutation.mutate(connectionId);
  };

  return {
    pendingConnections: pendingConnections || [],
    isLoading,
    error,
    handleAcceptConnection,
    handleRejectConnection,
  };
}; 