import { useEffect, useRef } from 'react';

interface SpaceBackgroundProps {
  children: React.ReactNode;
}

export default function SpaceBackground({ children }: SpaceBackgroundProps) {
  const starsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateStars = () => {
      if (!starsContainerRef.current) return;
      
      const container = starsContainerRef.current;
      const starCount = 100;
      
      // Clear existing stars
      container.innerHTML = '';
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(star);
      }
    };

    generateStars();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Animated Space Background */}
      <div className="fixed inset-0 space-gradient z-0">
        {/* Stars container */}
        <div ref={starsContainerRef} className="absolute inset-0" />
        
        {/* Floating planets */}
        <div 
          className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-30 animate-float" 
          style={{
            background: 'radial-gradient(circle at 30% 30%, #4FC3F7, #1976D2)',
            animationDelay: '-2s'
          }}
        />
        
        <div 
          className="absolute bottom-40 left-10 w-24 h-24 rounded-full opacity-40 animate-float" 
          style={{
            background: 'radial-gradient(circle at 40% 40%, #FF8A65, #D84315)',
            animationDelay: '-4s'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
