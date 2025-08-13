import SpaceBackground from '@/components/space-background';
import Navigation from '@/components/navigation';
import RocketBuilderComponent from '@/components/rocket-builder-component';
import { Card } from '@/components/ui/card';

export default function RocketBuilder() {
  return (
    <SpaceBackground>
      <Navigation />
      
      <div className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-solar-yellow mb-6">
              <i className="fas fa-wrench mr-4"></i>
              Build Your Own Rocket
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Design and test your own rocket! Drag components to build your spacecraft, 
              then launch it to see if your design can reach orbit. Use your aerospace 
              engineering knowledge to create the perfect rocket.
            </p>
          </div>

          {/* Instructions Card */}
          <Card className="glass-effect rounded-xl p-6 mb-12 max-w-4xl mx-auto">
            <h3 className="font-orbitron text-xl font-bold text-neon-cyan mb-4">
              <i className="fas fa-info-circle mr-2"></i>
              How to Build Your Rocket
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-solar-yellow mb-2">Step 1: Drag Components</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Drag rocket parts from the Components panel to the correct zones in the Assembly Bay. 
                  Each part has a specific location where it belongs.
                </p>
                
                <h4 className="font-bold text-solar-yellow mb-2">Step 2: Check Performance</h4>
                <p className="text-gray-300 text-sm">
                  Monitor your rocket's stability and efficiency meters. Higher values mean better performance.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-solar-yellow mb-2">Step 3: Test Launch</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Once all components are added, test your rocket design. The launch simulation will show 
                  if your rocket can reach orbit.
                </p>
                
                <h4 className="font-bold text-solar-yellow mb-2">Step 4: Optimize</h4>
                <p className="text-gray-300 text-sm">
                  Reset and try different combinations to achieve the perfect launch!
                </p>
              </div>
            </div>
          </Card>

          {/* Rocket Builder Component */}
          <RocketBuilderComponent />

          {/* Educational Tips */}
          <Card className="glass-effect rounded-xl p-8 mt-12">
            <h3 className="font-orbitron text-2xl font-bold text-cosmic-purple mb-6 text-center">
              <i className="fas fa-lightbulb mr-2"></i>
              Rocket Design Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-cyan to-cosmic-purple rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-balance-scale text-2xl text-white"></i>
                </div>
                <h4 className="font-bold text-neon-cyan mb-2">Stability</h4>
                <p className="text-gray-300 text-sm">
                  Fins and proper weight distribution are crucial for stable flight. 
                  Without fins, your rocket will tumble out of control.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-solar-yellow to-cosmic-purple rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-tachometer-alt text-2xl text-white"></i>
                </div>
                <h4 className="font-bold text-solar-yellow mb-2">Efficiency</h4>
                <p className="text-gray-300 text-sm">
                  The nose cone reduces drag, while powerful engines and sufficient fuel 
                  ensure your rocket has enough thrust to escape Earth's gravity.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cosmic-purple to-red-500 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-rocket text-2xl text-white"></i>
                </div>
                <h4 className="font-bold text-cosmic-purple mb-2">Real Physics</h4>
                <p className="text-gray-300 text-sm">
                  This simulation follows real rocket science principles. 
                  Every component affects your rocket's performance differently.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SpaceBackground>
  );
}
