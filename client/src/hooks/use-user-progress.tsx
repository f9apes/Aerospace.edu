import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { UserState, Activity } from "@/types";

// Mock user for demo - in production this would come from authentication
const DEMO_USER_ID = "demo-user-123";

export function useUserProgress() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get or create demo user
  const { data: user, isLoading } = useQuery<UserState>({
    queryKey: ["/api/user", DEMO_USER_ID],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/user/${DEMO_USER_ID}`);
        if (!response.ok && response.status === 404) {
          // Create demo user
          const createResponse = await apiRequest("POST", "/api/users", {
            username: "Space Explorer",
            email: "explorer@aero.edu"
          });
          return createResponse.json();
        }
        return response.json();
      } catch (error) {
        // Create demo user if none exists
        const createResponse = await apiRequest("POST", "/api/users", {
          username: "Space Explorer",
          email: "explorer@aero.edu"
        });
        return createResponse.json();
      }
    }
  });

  // Get user activities
  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ["/api/user", DEMO_USER_ID, "activities"],
    enabled: !!user
  });

  // Award XP mutation
  const awardXPMutation = useMutation({
    mutationFn: async ({ xpToAdd, reason }: { xpToAdd: number; reason: string }) => {
      const response = await apiRequest("POST", `/api/user/${DEMO_USER_ID}/xp`, {
        xpToAdd,
        reason
      });
      return response.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user", DEMO_USER_ID], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["/api/user", DEMO_USER_ID, "activities"] });
      toast({
        title: "XP Earned!",
        description: `You earned ${updatedUser.xp - (user?.xp || 0)} XP!`,
        duration: 3000,
      });
    }
  });

  // Add badge mutation
  const addBadgeMutation = useMutation({
    mutationFn: async ({ badge, description }: { badge: string; description: string }) => {
      const response = await apiRequest("POST", `/api/user/${DEMO_USER_ID}/badge`, {
        badge,
        description
      });
      return response.json();
    },
    onSuccess: (updatedUser, { badge }) => {
      queryClient.setQueryData(["/api/user", DEMO_USER_ID], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["/api/user", DEMO_USER_ID, "activities"] });
      toast({
        title: "Badge Unlocked!",
        description: `You earned the ${badge} badge!`,
        duration: 5000,
      });
    }
  });

  const awardXP = (xpToAdd: number, reason: string) => {
    awardXPMutation.mutate({ xpToAdd, reason });
  };

  const addBadge = (badge: string, description: string) => {
    addBadgeMutation.mutate({ badge, description });
  };

  return {
    user,
    activities,
    isLoading,
    awardXP,
    addBadge,
    userId: DEMO_USER_ID
  };
}
