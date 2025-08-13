import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import SpaceBackground from '@/components/space-background';
import Navigation from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserProgress } from '@/hooks/use-user-progress';
import { Activity, LearningModule, RocketDesign } from '@/types';
import { BADGE_DEFINITIONS } from '@/types';

export default function Dashboard() {
  const { user, activities, isLoading, userId } = useUserProgress();
  
  // Fetch modules for progress tracking
  const { data: modules = [] } = useQuery<LearningModule[]>({
    queryKey: ['/api/modules']
  });

  // Fetch user's module progress
  const { data: moduleProgress = [] } = useQuery({
    queryKey: ['/api/user', userId, 'progress'],
    enabled: !!userId
  });

  // Fetch user's rocket designs
  const { data: rocketDesigns = [] } = useQuery<RocketDesign[]>({
    queryKey: ['/api/user', userId, 'rockets'],
    enabled: !!userId
  });

  if (isLoading) {
    return (
      <SpaceBackground>
        <Navigation />
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">Loading dashboard...</p>
          </div>
        </div>
      </SpaceBackground>
    );
  }

  const completedModulesCount = moduleProgress.filter(p => p.completed).length;
  const totalBadges = user?.badges?.length || 0;
  const level = user?.level || 1;
  const xp = user?.xp || 0;
  const xpToNextLevel = (level * 500) - xp;
  const xpProgress = (xp % 500) / 500 * 100;

  const getLevelTitle = (level: number) => {
    if (level < 2) return 'Space Cadet';
    if (level < 4) return 'Astronaut Trainee';
    if (level < 6) return 'Mission Specialist';
    if (level < 8) return 'Commander';
    return 'Space Legend';
  };

  return (
    <SpaceBackground>
      <Navigation />
      
      <div className="container mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="font-orbitron text-4xl font-bold text-neon-cyan mb-6">
            Mission Control Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Track your progress and unlock achievements as you master aerospace engineering!
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800 border border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-dark-space">
              <i className="fas fa-tachometer-alt mr-2"></i>
              Overview
            </TabsTrigger>
            <TabsTrigger value="modules" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-dark-space">
              <i className="fas fa-graduation-cap mr-2"></i>
              Modules
            </TabsTrigger>
            <TabsTrigger value="rockets" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-dark-space">
              <i className="fas fa-rocket mr-2"></i>
              Rockets
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-dark-space">
              <i className="fas fa-history mr-2"></i>
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              {/* XP Progress */}
              <Card className="glass-effect rounded-xl p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-solar-yellow to-cosmic-purple rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-star text-3xl text-white"></i>
                </div>
                <h3 className="font-orbitron text-2xl font-bold text-solar-yellow mb-2">Experience Points</h3>
                <div className="text-4xl font-bold text-white mb-2">{xp}</div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div 
                    className="progress-bar h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300">
                  Level {level} {getLevelTitle(level)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {xpToNextLevel} XP to next level
                </p>
              </Card>
              
              {/* Modules Completed */}
              <Card className="glass-effect rounded-xl p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-neon-cyan to-cosmic-purple rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-graduation-cap text-3xl text-white"></i>
                </div>
                <h3 className="font-orbitron text-2xl font-bold text-neon-cyan mb-2">Modules Completed</h3>
                <div className="text-4xl font-bold text-white mb-2">{completedModulesCount}</div>
                <p className="text-sm text-gray-300">out of {modules.length} total modules</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {modules.map((module) => {
                    const isCompleted = moduleProgress.some(p => p.moduleId === module.id && p.completed);
                    return (
                      <div 
                        key={module.id}
                        className={`h-2 rounded-full ${isCompleted ? 'bg-neon-cyan' : 'bg-gray-600'}`}
                      />
                    );
                  })}
                </div>
              </Card>
              
              {/* Badges Earned */}
              <Card className="glass-effect rounded-xl p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cosmic-purple to-neon-cyan rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-medal text-3xl text-white"></i>
                </div>
                <h3 className="font-orbitron text-2xl font-bold text-cosmic-purple mb-2">Badges Earned</h3>
                <div className="text-4xl font-bold text-white mb-2">{totalBadges}</div>
                <p className="text-sm text-gray-300">achievements unlocked</p>
                
                {/* Badge Collection */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {Object.entries(BADGE_DEFINITIONS).slice(0, 6).map(([badgeId, badge]) => {
                    const isEarned = user?.badges?.includes(badgeId);
                    return (
                      <div 
                        key={badgeId}
                        className={`p-2 rounded-lg transition-all ${isEarned ? 'bg-cosmic-purple/30 text-cosmic-purple' : 'bg-gray-700 text-gray-500'}`}
                        title={badge.description}
                      >
                        <i className={`${badge.icon} text-lg`}></i>
                        <p className="text-xs mt-1 truncate">{badge.name.split(' ')[0]}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="glass-effect rounded-xl p-8">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-6 text-center">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/#modules-section">
                  <Button className="w-full h-20 bg-gradient-to-r from-neon-cyan to-cosmic-purple hover:scale-105 transition-all">
                    <div className="text-center">
                      <i className="fas fa-play text-2xl block mb-2"></i>
                      <span className="font-bold">Continue Learning</span>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/rocket-builder">
                  <Button className="w-full h-20 bg-gradient-to-r from-solar-yellow to-cosmic-purple hover:scale-105 transition-all">
                    <div className="text-center">
                      <i className="fas fa-wrench text-2xl block mb-2"></i>
                      <span className="font-bold">Build Rocket</span>
                    </div>
                  </Button>
                </Link>
                
                <Button 
                  className="w-full h-20 bg-gradient-to-r from-cosmic-purple to-neon-cyan hover:scale-105 transition-all"
                  onClick={() => window.location.reload()}
                >
                  <div className="text-center">
                    <i className="fas fa-sync text-2xl block mb-2"></i>
                    <span className="font-bold">Refresh Progress</span>
                  </div>
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const progress = moduleProgress.find(p => p.moduleId === module.id);
                const isCompleted = progress?.completed || false;
                const score = progress?.score || 0;
                
                return (
                  <Card key={module.id} className="glass-effect rounded-xl p-6">
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                        isCompleted ? 'bg-gradient-to-br from-green-500 to-neon-cyan' : 'bg-gray-600'
                      }`}>
                        <i className={`${isCompleted ? 'fas fa-check' : 'fas fa-lock'} text-2xl text-white`}></i>
                      </div>
                      <h3 className="font-orbitron text-lg font-bold text-neon-cyan">
                        Module {module.id}
                      </h3>
                      <p className="text-sm text-gray-300">{module.title}</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{module.duration} min</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">XP Reward:</span>
                        <span className="text-solar-yellow">{module.xpReward} XP</span>
                      </div>
                      {isCompleted && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Score:</span>
                          <span className="text-green-400">{score}%</span>
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/module/${module.id}`}>
                      <Button className={`w-full ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-green-500 to-neon-cyan' 
                          : 'bg-gradient-to-r from-neon-cyan to-cosmic-purple'
                      }`}>
                        {isCompleted ? 'Review Module' : 'Start Module'}
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Rockets Tab */}
          <TabsContent value="rockets">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rocketDesigns.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <i className="fas fa-rocket text-6xl text-gray-600 mb-4"></i>
                  <h3 className="font-orbitron text-xl font-bold text-gray-400 mb-2">No Rockets Built Yet</h3>
                  <p className="text-gray-500 mb-6">Start building your first rocket to see it here!</p>
                  <Link href="/rocket-builder">
                    <Button className="bg-gradient-to-r from-solar-yellow to-cosmic-purple">
                      <i className="fas fa-wrench mr-2"></i>
                      Build Your First Rocket
                    </Button>
                  </Link>
                </div>
              ) : (
                rocketDesigns.map((rocket) => (
                  <Card key={rocket.id} className="glass-effect rounded-xl p-6">
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                        rocket.launchSuccess 
                          ? 'bg-gradient-to-br from-green-500 to-neon-cyan' 
                          : 'bg-gradient-to-br from-red-500 to-orange-500'
                      }`}>
                        <i className="fas fa-rocket text-2xl text-white"></i>
                      </div>
                      <h3 className="font-orbitron text-lg font-bold text-white">
                        {rocket.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Stability:</span>
                        <span className="text-white">{rocket.stability}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Efficiency:</span>
                        <span className="text-white">{rocket.efficiency}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Status:</span>
                        <span className={rocket.launchSuccess ? 'text-green-400' : 'text-red-400'}>
                          {rocket.launchSuccess ? 'Success' : 'Failed'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      Built on {new Date(rocket.createdAt).toLocaleDateString()}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="glass-effect rounded-xl p-6">
              <h3 className="font-orbitron text-2xl font-bold text-neon-cyan mb-6">
                <i className="fas fa-history mr-2"></i>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {activities.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-clock text-4xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400">No activity yet. Start learning to see your progress here!</p>
                  </div>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <i className={`fas ${
                          activity.activityType === 'module_completed' ? 'fa-graduation-cap text-neon-cyan' :
                          activity.activityType === 'rocket_built' ? 'fa-rocket text-solar-yellow' :
                          activity.activityType === 'badge_earned' ? 'fa-medal text-cosmic-purple' :
                          activity.activityType === 'xp_earned' ? 'fa-star text-solar-yellow' :
                          'fa-play-circle text-neon-cyan'
                        }`}></i>
                        <div>
                          <p className="text-white">{activity.description}</p>
                          {activity.xpEarned > 0 && (
                            <p className="text-sm text-solar-yellow">+{activity.xpEarned} XP</p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SpaceBackground>
  );
}
