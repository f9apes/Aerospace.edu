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
      const previousXP = user?.xp || 0;
      const xpGained = updatedUser.xp - previousXP;
      const previousLevel = user?.level || 1;
      const newLevel = updatedUser.level;
      
      queryClient.setQueryData(["/api/user", DEMO_USER_ID], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["/api/user", DEMO_USER_ID, "activities"] });
      
      // Show XP animation
      if (xpGained > 0) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 z-50 bg-gradient-to-r from-solar-yellow to-cosmic-purple text-white px-4 py-2 rounded-lg font-bold shadow-lg';
        notification.innerHTML = `
          <div class="flex items-center space-x-2">
            <i class="fas fa-star text-lg"></i>
            <span>+${xpGained} XP</span>
          </div>
        `;
        document.body.appendChild(notification);

        // Animate the notification
        notification.style.transform = 'translateX(100px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
          notification.style.transition = 'all 0.5s ease-out';
          notification.style.transform = 'translateX(0)';
          notification.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
          notification.style.transform = 'translateY(-50px)';
          notification.style.opacity = '0';
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 500);
        }, 2500);
      }
      
      // Show level up notification
      if (newLevel > previousLevel) {
        toast({
          title: "🎉 Level Up!",
          description: `Congratulations! You reached Level ${newLevel}!`,
          duration: 5000,
        });
      } else {
        toast({
          title: "XP Earned!",
          description: `You earned ${xpGained} XP!`,
          duration: 3000,
        });
      }
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
