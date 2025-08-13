import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { SPACE_MISSIONS } from '@/types';
import animations from '@/lib/animations';

export default function Timeline() {
  useEffect(() => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      animations.animateTimelineItem(item as HTMLElement, index * 0.2);
    });
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-cosmic-purple mb-6">
            Space Missions Through Time
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the greatest achievements in space exploration, from the first satellite to Mars missions.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-neon-cyan to-cosmic-purple h-full"></div>
          
          {/* Timeline Events */}
          <div className="space-y-16">
            {SPACE_MISSIONS.map((mission, index) => (
              <div key={mission.year} className={`timeline-item flex items-center relative ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <Card className="glass-effect p-6 rounded-xl hover:scale-105 transition-all duration-300">
                    <h3 className={`font-orbitron text-2xl font-bold text-${mission.color} mb-2`}>
                      {mission.year}
                    </h3>
                    <h4 className="text-xl font-bold mb-3">{mission.title}</h4>
                    <img 
                      src={mission.imageUrl}
                      alt={mission.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <p className="text-gray-300">{mission.description}</p>
                  </Card>
                </div>
                
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-${mission.color} rounded-full border-4 border-space-blue z-10`}></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
