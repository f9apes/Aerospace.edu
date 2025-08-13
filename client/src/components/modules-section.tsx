import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LearningModule } from '@/types';
import animations from '@/lib/animations';

export default function ModulesSection() {
  const { data: modules = [], isLoading } = useQuery<LearningModule[]>({
    queryKey: ['/api/modules']
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      animations.animateModuleCards();
    }, 100);

    return () => clearTimeout(timer);
  }, [modules]);

  if (isLoading) {
    return (
      <section id="modules-section" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-neon-cyan mb-6">
              Mission Modules
            </h2>
            <div className="animate-pulse">Loading modules...</div>
          </div>
        </div>
      </section>
    );
  }

  const getModuleColor = (moduleId: number) => {
    const colors = ['neon-cyan', 'solar-yellow', 'cosmic-purple'];
    return colors[moduleId - 1] || 'neon-cyan';
  };

  const getModuleIcon = (moduleId: number) => {
    const icons = ['fas fa-plane', 'fas fa-rocket', 'fas fa-globe'];
    return icons[moduleId - 1] || 'fas fa-rocket';
  };

  return (
    <section id="modules-section" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-neon-cyan mb-6">
            Mission Modules
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete these core modules to master the fundamentals of aerospace engineering. 
            Each mission builds your knowledge and earns you valuable XP points.
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {modules.map((module) => {
            const color = getModuleColor(module.id);
            const icon = getModuleIcon(module.id);
            
            return (
              <Card 
                key={module.id}
                className="module-card glass-effect rounded-xl p-8 cursor-pointer card-hover click-feedback"
              >
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br from-${color} to-cosmic-purple rounded-full flex items-center justify-center mb-4`}>
                    <i className={`${icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className={`font-orbitron text-2xl font-bold text-${color} mb-2`}>
                    Module {module.id}
                  </h3>
                  <h4 className="text-xl font-semibold mb-4">{module.title}</h4>
                </div>
                
                <img 
                  src={module.imageUrl}
                  alt={module.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <p className="text-gray-300 mb-6">
                  {module.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-clock text-solar-yellow"></i>
                    <span className="text-sm">{module.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-star text-solar-yellow"></i>
                    <span className="text-sm">{module.xpReward} XP</span>
                  </div>
                </div>
                
                <Link href={`/module/${module.id}`}>
                  <Button className="w-full bg-gradient-to-r from-neon-cyan to-cosmic-purple py-3 rounded-lg font-bold hover:scale-105 transition-all">
                    Launch Module
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Quick Access to Rocket Builder */}
        <div className="text-center">
          <Card className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="font-orbitron text-2xl font-bold text-solar-yellow mb-4">
              Ready to Build?
            </h3>
            <p className="text-gray-300 mb-6">
              Put your knowledge to the test with our interactive rocket builder. 
              Design, test, and launch your own spacecraft!
            </p>
            <Link href="/rocket-builder">
              <Button size="lg" className="bg-gradient-to-r from-solar-yellow to-cosmic-purple px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all">
                <i className="fas fa-wrench mr-2"></i>
                Open Rocket Builder
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
