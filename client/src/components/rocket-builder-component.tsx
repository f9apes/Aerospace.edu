import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RocketState } from '@/types';
import type { RocketParts } from '@shared/schema';
import { useUserProgress } from '@/hooks/use-user-progress';
import { RocketVisualization } from '@/lib/three-setup';
import animations from '@/lib/animations';

const ROCKET_PARTS = [
  {
    id: 'nose-cone',
    name: 'Nose Cone',
    description: 'Reduces air resistance',
    icon: 'fas fa-triangle-exclamation',
    color: 'neon-cyan',
    zone: 'nose'
  },
  {
    id: 'payload',
    name: 'Payload Bay',
    description: 'Carries satellites or crew',
    icon: 'fas fa-satellite',
    color: 'solar-yellow',
    zone: 'payload'
  },
  {
    id: 'fuel-tank',
    name: 'Fuel Tank',
    description: 'Stores rocket propellant',
    icon: 'fas fa-gas-pump',
    color: 'cosmic-purple',
    zone: 'fuel'
  },
  {
    id: 'engine',
    name: 'Engine',
    description: 'Provides thrust for launch',
    icon: 'fas fa-fire',
    color: 'red-500',
    zone: 'engine'
  },
  {
    id: 'fins',
    name: 'Fins',
    description: 'Provides stability in flight',
    icon: 'fas fa-paper-plane',
    color: 'green-500',
    zone: 'fins'
  }
];

const DROP_ZONES = [
  { id: 'nose', label: 'Nose Cone', icon: 'fas fa-arrow-up' },
  { id: 'payload', label: 'Payload', icon: 'fas fa-satellite' },
  { id: 'fuel', label: 'Fuel Tank', icon: 'fas fa-gas-pump' },
  { id: 'engine', label: 'Engine', icon: 'fas fa-fire' },
  { id: 'fins', label: 'Fins', icon: 'fas fa-paper-plane' }
];

export default function RocketBuilderComponent() {
  const [rocketState, setRocketState] = useState<RocketState>({
    parts: {
      nose: false,
      payload: false,
      fuel: false,
      engine: false,
      fins: false
    },
    stability: 0,
    efficiency: 0,
    name: 'My Rocket'
  });
  
  const [draggedPart, setDraggedPart] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [feedback, setFeedback] = useState('Start building your rocket by dragging components to the assembly bay!');
  const [feedbackType, setFeedbackType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  
  const rocketVisualizationRef = useRef<RocketVisualization | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { awardXP, addBadge } = useUserProgress();

  useEffect(() => {
    if (containerRef.current) {
      rocketVisualizationRef.current = new RocketVisualization(containerRef.current);
      return () => {
        rocketVisualizationRef.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    updateRocketStats();
    if (rocketVisualizationRef.current) {
      rocketVisualizationRef.current.updateRocketParts(rocketState.parts as unknown as Record<string, boolean>);
    }
  }, [rocketState.parts]);

  useEffect(() => {
    animations.animateRocketParts();
  }, []);

  const updateRocketStats = () => {
    const parts = rocketState.parts;
    let stability = 0;
    let efficiency = 0;

    // Calculate stability
    if (parts.nose) stability += 20;
    if (parts.fins) stability += 40;
    if (parts.engine) stability += 20;
    if (parts.fuel && parts.payload) stability += 20;

    // Calculate efficiency
    if (parts.engine) efficiency += 30;
    if (parts.fuel) efficiency += 30;
    if (parts.nose) efficiency += 20;
    if (parts.payload) efficiency += 10;
    if (parts.fins) efficiency += 10;

    setRocketState(prev => ({
      ...prev,
      stability,
      efficiency
    }));

    // Update feedback based on completion
    const allPartsAdded = Object.values(parts).every(part => part);
    if (allPartsAdded) {
      setFeedback('Rocket assembly complete! Ready for launch test.');
      setFeedbackType('success');
    } else {
      const missingParts = Object.entries(parts)
        .filter(([, added]) => !added)
        .map(([partName]) => partName)
        .join(', ');
      setFeedback(`Missing parts: ${missingParts}. Keep building!`);
      setFeedbackType('info');
    }
  };

  const handleDragStart = (e: React.DragEvent, partId: string) => {
    setDraggedPart(partId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    
    if (!draggedPart) return;
    
    const part = ROCKET_PARTS.find(p => p.id === draggedPart);
    if (!part || part.zone !== zoneId) {
      setFeedback("That part doesn't belong there! Try a different zone.");
      setFeedbackType('error');
      setDraggedPart(null);
      return;
    }

    setRocketState(prev => ({
      ...prev,
      parts: {
        ...prev.parts,
        [zoneId]: true
      }
    }));
    
    setDraggedPart(null);
    awardXP(10, `Added ${part.name} to rocket`);
  };

  const handleTestLaunch = async () => {
    if (!Object.values(rocketState.parts).every(part => part)) {
      setFeedback('Complete your rocket before testing!');
      setFeedbackType('warning');
      return;
    }

    setIsLaunching(true);
    setFeedback('Preparing for launch...');
    setFeedbackType('info');

    // Simulate launch with animation
    if (rocketVisualizationRef.current) {
      await rocketVisualizationRef.current.launchAnimation();
    }

    const { stability, efficiency } = rocketState;
    let result = '';
    let success = false;
    let xpReward = 0;

    if (stability >= 80 && efficiency >= 80) {
      result = '🚀 Perfect Launch! Your rocket reached orbit successfully!';
      success = true;
      xpReward = 200;
      addBadge('builder', 'Successfully launched a rocket');
    } else if (stability >= 60 && efficiency >= 60) {
      result = '🌟 Good Launch! Your rocket reached space but needs optimization.';
      success = true;
      xpReward = 150;
    } else if (stability >= 40) {
      result = '⚠️ Partial Success. Your rocket launched but didn\'t reach orbit.';
      xpReward = 100;
    } else {
      result = '💥 Launch Failed! Your rocket was unstable and crashed.';
      xpReward = 50;
    }

    setFeedback(result);
    setFeedbackType(success ? 'success' : 'warning');
    awardXP(xpReward, `Rocket launch test: ${result}`);
    
    setIsLaunching(false);
  };

  const handleReset = () => {
    setRocketState({
      parts: {
        nose: false,
        payload: false,
        fuel: false,
        engine: false,
        fins: false
      },
      stability: 0,
      efficiency: 0,
      name: 'My Rocket'
    });
    
    setFeedback('Rocket design cleared. Start building again!');
    setFeedbackType('info');
  };

  const isComplete = Object.values(rocketState.parts).every(part => part);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      {/* Rocket Parts Panel */}
      <Card className="glass-effect rounded-xl p-6">
        <h3 className="font-orbitron text-2xl font-bold text-neon-cyan mb-6 text-center">
          <i className="fas fa-cogs mr-2"></i>
          Rocket Components
        </h3>
        
        <div className="space-y-4">
          {ROCKET_PARTS.map((part) => (
            <div
              key={part.id}
              className={`rocket-part bg-gradient-to-r from-${part.color}/20 to-cosmic-purple/20 p-4 rounded-lg border border-${part.color}/30 transition-all hover:scale-105 hover:brightness-110`}
              draggable={!rocketState.parts[part.zone as keyof RocketParts]}
              onDragStart={(e) => handleDragStart(e, part.id)}
              style={{ 
                opacity: rocketState.parts[part.zone as keyof RocketParts] ? 0.5 : 1,
                cursor: rocketState.parts[part.zone as keyof RocketParts] ? 'not-allowed' : 'grab'
              }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-${part.color} rounded-full flex items-center justify-center`}>
                  <i className={`${part.icon} text-white`}></i>
                </div>
                <div>
                  <h4 className={`font-bold text-${part.color}`}>{part.name}</h4>
                  <p className="text-sm text-gray-300">{part.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Rocket Assembly Area */}
      <Card className="glass-effect rounded-xl p-6">
        <h3 className="font-orbitron text-2xl font-bold text-solar-yellow mb-6 text-center">
          <i className="fas fa-hammer mr-2"></i>
          Assembly Bay
        </h3>
        
        <div className="relative h-96 border-2 border-dashed border-gray-500 rounded-lg flex flex-col">
          {DROP_ZONES.map((zone, index) => (
            <div
              key={zone.id}
              className={`drop-zone flex-1 ${index < DROP_ZONES.length - 1 ? 'border-b border-dashed border-gray-600' : ''} flex items-center justify-center transition-all hover:bg-neon-cyan/5`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
            >
              {rocketState.parts[zone.id as keyof RocketParts] ? (
                <div className="text-center">
                  <i className="fas fa-check-circle text-green-400 text-2xl mb-2"></i>
                  <span className="text-green-400 font-medium">{zone.label} Added!</span>
                </div>
              ) : (
                <span className="text-gray-500 text-center">
                  <i className={`${zone.icon} text-2xl block mb-2`}></i>
                  Drag {zone.label} Here
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 space-y-3">
          <Button
            onClick={handleTestLaunch}
            disabled={!isComplete || isLaunching}
            className="w-full bg-gradient-to-r from-neon-cyan to-cosmic-purple py-3 rounded-lg font-bold interactive-btn btn-glow disabled:opacity-50"
          >
            {isLaunching ? (
              <>
                <i className="fas fa-spinner animate-spin mr-2"></i>
                Launching...
              </>
            ) : (
              <>
                <i className="fas fa-play mr-2"></i>
                Test Launch
              </>
            )}
          </Button>
          
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full border-gray-600 hover:bg-gray-700 interactive-btn"
          >
            <i className="fas fa-redo mr-2"></i>
            Reset Design
          </Button>
        </div>
      </Card>
      
      {/* Launch Simulation Area */}
      <Card className="glass-effect rounded-xl p-6">
        <h3 className="font-orbitron text-2xl font-bold text-neon-cyan mb-6 text-center">
          <i className="fas fa-rocket mr-2"></i>
          Launch Pad
        </h3>
        
        {/* 3D Rocket Visualization */}
        <div 
          ref={containerRef}
          className="w-full h-64 bg-black rounded-lg mb-4 border border-neon-cyan/30"
        />
        
        {/* Feedback Panel */}
        <div className="space-y-3">
          <Card className="bg-gray-800 p-3 rounded-lg">
            <h4 className="font-bold text-solar-yellow mb-2">
              <i className="fas fa-info-circle mr-2"></i>
              Mission Status
            </h4>
            <p className={`text-sm ${
              feedbackType === 'success' ? 'text-green-400' :
              feedbackType === 'warning' ? 'text-yellow-400' :
              feedbackType === 'error' ? 'text-red-400' :
              'text-gray-300'
            }`}>
              {feedback}
            </p>
          </Card>
          
          {/* Performance Meters */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gray-800 p-3 rounded-lg text-center">
              <h5 className="text-xs font-bold text-gray-400 mb-1">STABILITY</h5>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${rocketState.stability}%` }}
                />
              </div>
              <span className="text-xs text-gray-300">{rocketState.stability}%</span>
            </Card>
            
            <Card className="bg-gray-800 p-3 rounded-lg text-center">
              <h5 className="text-xs font-bold text-gray-400 mb-1">EFFICIENCY</h5>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${rocketState.efficiency}%` }}
                />
              </div>
              <span className="text-xs text-gray-300">{rocketState.efficiency}%</span>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
