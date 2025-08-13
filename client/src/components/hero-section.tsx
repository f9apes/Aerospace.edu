import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import animations from '@/lib/animations';

const PREVIEW_CARDS = [
  {
    title: 'Rocket Science',
    description: 'Discover how rockets overcome Earth\'s gravity',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    moduleId: 2
  },
  {
    title: 'Space Technology',
    description: 'Explore satellites and space stations',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    moduleId: 3
  },
  {
    title: 'Space Exploration',
    description: 'Journey through space mission history',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    moduleId: 1
  }
];

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      animations.animateHeroText(titleRef.current, 'Welcome to Aero.edu');
    }
  }, []);

  const scrollToModules = () => {
    const modulesSection = document.getElementById('modules-section');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="text-center max-w-4xl mx-auto">
        {/* Animated Headline */}
        <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span 
            ref={titleRef}
            className="block text-neon-cyan mb-4"
          >
            {/* Text will be animated in */}
          </span>
          <span className="block text-solar-yellow text-3xl md:text-4xl font-medium">
            Your Mission to the Stars Starts Here
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Launch your curiosity and engineer the future, one student at a time. 
          Explore the cosmos through interactive learning and hands-on challenges.
        </p>
        
        {/* CTA Button */}
        <Button
          onClick={scrollToModules}
          size="lg"
          className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-neon-cyan to-cosmic-purple rounded-full text-xl font-bold hover:scale-105 transition-all duration-300 animate-pulse-glow group mb-16"
        >
          <i className="fas fa-rocket mr-3 group-hover:animate-bounce"></i>
          Start Mission
          <i className="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
        </Button>
        
        {/* Teaser Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PREVIEW_CARDS.map((card, index) => (
            <Link key={index} href={`/module/${card.moduleId}`}>
              <Card className="glass-effect rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group">
                <img 
                  src={card.image}
                  alt={card.description}
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:brightness-110 transition-all"
                />
                <h3 className="font-orbitron text-xl font-bold text-neon-cyan mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-300">{card.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-neon-cyan text-2xl"></i>
      </div>
    </section>
  );
}
