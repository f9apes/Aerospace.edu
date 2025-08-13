import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animations = {
  // Hero section animations
  animateHeroText: (element: HTMLElement, text: string) => {
    element.innerHTML = '';
    element.classList.add('typing-cursor');
    
    let index = 0;
    const typeCharacter = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeCharacter, 100);
      } else {
        setTimeout(() => {
          element.classList.remove('typing-cursor');
        }, 1000);
      }
    };
    
    setTimeout(typeCharacter, 1000);
  },

  // Stagger animations for module cards
  animateModuleCards: () => {
    gsap.fromTo('.module-card', 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.module-card',
          start: 'top 80%',
          end: 'bottom 20%',
        }
      }
    );
  },

  // Rocket parts animation
  animateRocketParts: () => {
    gsap.fromTo('.rocket-part',
      {
        scale: 0.8,
        opacity: 0
      },
      {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    );
  },

  // Launch animation
  animateRocketLaunch: (container: HTMLElement, onComplete?: () => void) => {
    const timeline = gsap.timeline();
    
    // Initial rocket on launch pad
    timeline.set(container, { 
      innerHTML: `
        <div class="rocket-launch-animation">
          <div class="rocket text-6xl mb-4">🚀</div>
          <div class="flames text-4xl">🔥</div>
          <p class="text-orange-400 font-bold">PREPARING FOR LAUNCH...</p>
        </div>
      ` 
    });

    // Countdown
    timeline.to({}, { duration: 1 })
      .call(() => {
        container.querySelector('p')!.textContent = 'IGNITION!';
      })
      .to('.flames', { 
        scale: 2, 
        duration: 0.5,
        ease: 'power2.out'
      })
      
    // Launch sequence
      .to('.rocket', {
        y: -500,
        scale: 0.5,
        duration: 2,
        ease: 'power2.in'
      })
      .to('.flames', {
        opacity: 0,
        duration: 0.5
      }, '-=1.5')
      
    // Orbit achieved
      .call(() => {
        container.innerHTML = `
          <div class="text-center">
            <div class="mb-4 animate-pulse">
              <div class="text-4xl mb-2">🛰️</div>
            </div>
            <p class="text-neon-cyan font-bold">ORBIT ACHIEVED!</p>
          </div>
        `;
        if (onComplete) onComplete();
      });

    return timeline;
  },

  // XP notification animation
  animateXPGain: (amount: number) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 z-50 bg-solar-yellow text-dark-space px-4 py-2 rounded-lg font-bold';
    notification.textContent = `+${amount} XP`;
    document.body.appendChild(notification);

    gsap.fromTo(notification,
      { 
        x: 100,
        opacity: 0,
        scale: 0.5
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }
    );

    gsap.to(notification, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      delay: 2,
      onComplete: () => {
        document.body.removeChild(notification);
      }
    });
  },

  // Badge unlock animation
  animateBadgeUnlock: (badgeName: string, icon: string) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    modal.innerHTML = `
      <div class="glass-effect rounded-xl p-8 text-center max-w-md mx-4">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-solar-yellow to-cosmic-purple rounded-full flex items-center justify-center mb-4">
          <i class="${icon} text-4xl text-white"></i>
        </div>
        <h3 class="font-orbitron text-2xl font-bold text-solar-yellow mb-2">Badge Unlocked!</h3>
        <h4 class="text-xl font-semibold mb-4">${badgeName}</h4>
        <button class="bg-gradient-to-r from-neon-cyan to-cosmic-purple px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all">
          Awesome!
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    // Animate modal entrance
    gsap.fromTo(modal.querySelector('.glass-effect'),
      {
        scale: 0.5,
        opacity: 0,
        rotation: -10
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }
    );

    // Badge icon pulse
    gsap.to(modal.querySelector('i'), {
      scale: 1.2,
      duration: 0.5,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut'
    });

    // Close modal on click
    modal.querySelector('button')!.addEventListener('click', () => {
      gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.body.removeChild(modal);
        }
      });
    });
  },

  // Progress bar animation
  animateProgressBar: (element: HTMLElement, progress: number) => {
    gsap.to(element, {
      width: `${progress}%`,
      duration: 1,
      ease: 'power2.out'
    });
  },

  // Timeline animations
  animateTimelineItem: (element: HTMLElement, delay: number = 0) => {
    gsap.fromTo(element,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        }
      }
    );
  }
};

export default animations;
