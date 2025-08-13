import SpaceBackground from '@/components/space-background';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import ModulesSection from '@/components/modules-section';
import Timeline from '@/components/timeline';

export default function Home() {
  return (
    <SpaceBackground>
      <Navigation />
      <main>
        <HeroSection />
        <ModulesSection />
        <Timeline />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 glass-effect border-t border-neon-cyan/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-rocket text-neon-cyan text-2xl"></i>
                <h3 className="font-orbitron text-xl font-bold text-neon-cyan">Aero.edu</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Launch your curiosity and engineer the future, one student at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Learning Modules</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/module/1" className="hover:text-neon-cyan transition-colors">Aerospace Basics</a></li>
                <li><a href="/module/2" className="hover:text-neon-cyan transition-colors">Rocket Science</a></li>
                <li><a href="/module/3" className="hover:text-neon-cyan transition-colors">Space Missions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Interactive Tools</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/rocket-builder" className="hover:text-neon-cyan transition-colors">Rocket Builder</a></li>
                <li><a href="/dashboard" className="hover:text-neon-cyan transition-colors">Dashboard</a></li>
                <li><span className="text-gray-500">3D Simulations</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-neon-cyan transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-neon-cyan transition-colors">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-neon-cyan transition-colors">
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm mb-2">
                  © 2025 Aero.edu. All rights reserved.
                </p>
                <p className="text-gray-400 text-sm">
                  Inspiring the next generation of aerospace engineers.
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm mb-1">Contact us:</p>
                <a 
                  href="mailto:aeroeng.edu@gmail.com" 
                  className="text-neon-cyan hover:text-solar-yellow transition-colors text-sm font-medium"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  aeroeng.edu@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </SpaceBackground>
  );
}
