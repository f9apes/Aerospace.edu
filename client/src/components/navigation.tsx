import { Link, useLocation } from 'wouter';
import { useUserProgress } from '@/hooks/use-user-progress';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [location] = useLocation();
  const { user, isLoading } = useUserProgress();

  if (isLoading) return null;

  return (
    <nav className="relative z-50 glass-effect border-b border-neon-cyan/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <i className="fas fa-rocket text-neon-cyan text-2xl"></i>
              <h1 className="font-orbitron text-2xl font-bold text-neon-cyan">Aero.edu</h1>
            </div>
          </Link>
          
          {/* Progress Indicator */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-star text-solar-yellow"></i>
              <span className="text-sm font-medium">{user?.xp || 0} XP</span>
            </div>
            <div className="w-32 h-2 bg-deep-space rounded-full overflow-hidden">
              <div 
                className="progress-bar h-full rounded-full transition-all duration-1000" 
                style={{ width: `${((user?.xp || 0) % 500) / 500 * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-300">Level {user?.level || 1}</span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white hover:text-neon-cyan">
                <i className="fas fa-user-astronaut mr-2"></i>
                Dashboard
              </Button>
            </Link>
            
            <Link href="/rocket-builder">
              <Button variant="ghost" className="text-white hover:text-neon-cyan">
                <i className="fas fa-wrench mr-2"></i>
                Rocket Builder
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
