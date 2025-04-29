import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { signOut } from "@/lib/supabase/actions";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  onPrevious?: () => void;
}

export function SignOutButton({ onPrevious }: SignOutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      if (onPrevious) {
        onPrevious();
      }
      await signOut();
      toast.success('Signed out successfully');
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      type="button" 
      variant="destructive" 
      onClick={handleSignOut}
      className="w-full sm:w-auto"
      disabled={isLoading}
    >
      <FaSignOutAlt className="mr-2 h-4 w-4" />
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </Button>
  );
} 