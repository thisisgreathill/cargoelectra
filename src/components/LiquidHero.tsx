import { useState, useEffect, useRef } from 'react';
import { Truck, ArrowRight, ShieldCheck, Zap, RotateCw, ExternalLink, Box } from 'lucide-react';
import { useI18n } from '../i18n';

interface LiquidHeroProps {
  onJoinAsDriver: () => void;
  onJoinAsBusiness: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function LiquidHero({
  onJoinAsDriver,
  onJoinAsBusiness,
  onNavigateToSection
}: LiquidHeroProps) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Trigger character animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Track cursor position relative to the screen to drive the 3D parallax and rotations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize position from -0.5 to 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Background Light Trails (Canvas) - Simulating "Cargo" + "Electra"
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Light trails on highway
    interface Trail {
      x: number;
      y: number;
      length: number;
      speed: number;
      width: number;
      color: string;
      alpha: number;
    }

    const trails: Trail[] = [];
    const colors = [
      'rgba(25,217,224, 0.45)',  // Teal-cyan #19D9E0 (logo "Cargo")
      'rgba(180,230,30, 0.40)',  // Electric lime #B4E61E (logo "Electra")
      'rgba(124,181,24, 0.28)',  // Deep lime #7CB518
      'rgba(255, 255, 255, 0.15)'  // Soft white
    ];

    // Seed trails
    for (let i = 0; i < 45; i++) {
      trails.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 120 + Math.random() * 280,
        speed: 1.5 + Math.random() * 4,
        width: 0.8 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.15 + Math.random() * 0.45
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 8, 17, 0.08)'; // Deep off-black/navy trails tail
      ctx.fillRect(0, 0, width, height);

      trails.forEach((trail) => {
        ctx.strokeStyle = trail.color;
        ctx.lineWidth = trail.width;
        ctx.beginPath();
        
        // Horizontal light speedlines representing logistics transport routes
        ctx.moveTo(trail.x, trail.y);
        ctx.lineTo(trail.x - trail.length, trail.y);
        ctx.stroke();

        // Update trail position
        trail.x += trail.speed;
        if (trail.x - trail.length > width) {
          trail.x = 0;
          trail.y = Math.random() * height;
          trail.speed = 1.5 + Math.random() * 4;
        }
      });

      // Draw subtle grid representing connected logistics nodes
      ctx.strokeStyle = 'rgba(25,217,224, 0.012)';
      ctx.lineWidth = 1;
      const gridSize = 120;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const headingLine1 = t('hero.line1');
  const headingLine2 = t('hero.line2');

  // Render a line with staggered per-char reveal, but keep whole words intact
  // (each word is an inline-block that never breaks mid-word across lines).
  const renderLine = (text: string, baseOffset: number) => {
    const words = text.split(' ');
    let charIdx = 0;
    return words.map((word, wi) => {
      const node = (
        <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => {
            const delay = 200 + (baseOffset + charIdx) * 30;
            charIdx++;
            return (
              <span
                key={`c-${wi}-${ci}`}
                className="inline-block transition-all transform origin-left"
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${delay}ms`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-18px)',
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
      charIdx++; // account for the space between words in the stagger timing
      return wi < words.length - 1 ? [node, <span key={`s-${wi}`}>{' '}</span>] : node;
    });
  };

  return (
    <div id="hero" className="relative w-full min-h-screen bg-[#050811] overflow-hidden flex flex-col justify-between">
      {/* Cinematic Route Simulation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60 z-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, #091326 0%, #050811 100%)'
        }}
      />

      {/* Decorative Light Radial Aura */}
      <div 
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] bg-gradient-to-br from-[#19D9E0]/10 to-transparent pointer-events-none transition-transform duration-700 ease-out z-0" 
        style={{ 
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`,
        }} 
      />
      <div 
        className="absolute bottom-[-10%] left-[-15%] w-[800px] h-[800px] rounded-full blur-[220px] bg-gradient-to-tr from-[#B4E61E]/12 to-transparent pointer-events-none transition-transform duration-1000 ease-out z-0" 
        style={{
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)`,
        }}
      />



      {/* Floating Header Spacer (navbar loaded externally in App.tsx layout) */}
      <div className="h-24"></div>

      {/* Hero Content (Bottom of Viewport) */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-end gap-12 lg:gap-8">
          
          {/* Left Column — Main Heading Content */}
          <div className="lg:col-span-11 flex flex-col items-start select-none max-w-4xl">
            
            {/* Animated Title */}
            <h1 
              className="font-normal mb-6 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] font-display font-medium" 
              style={{ letterSpacing: '-0.04em' }}
            >
              {/* Line 1 */}
              <span className="block mb-2 md:mb-3 font-display">
                {renderLine(headingLine1, 0)}
              </span>

              {/* Line 2 \u2014 lime highlight, mirrors the logo's "Electra" */}
              <span className="block font-display text-[#B4E61E] font-bold" style={{ textShadow: '0 0 34px rgba(180,230,30,0.35)' }}>
                {renderLine(headingLine2, headingLine1.length + 1)}
              </span>
            </h1>

            {/* Subtitle - Fade in with 800ms delay */}
            <p
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed font-light transition-opacity duration-1000 animate-fade-in"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: '800ms'
              }}
            >
              {t('hero.subtitle')}
            </p>

            {/* Buttons Row - Fade in with 1200ms delay */}
            <div
              className="flex flex-wrap gap-4 transition-opacity duration-1000"
              style={{
                opacity: mounted ? 1 : 0,
                transitionDelay: '1200ms'
              }}
            >
              <button
                id="btn-apply-driver"
                onClick={onJoinAsDriver}
                className="bg-[#19D9E0] hover:bg-cyan-300 text-black px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition duration-300 flex items-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(25,217,224,0.25)] active:scale-[0.98]"
              >
                {t('hero.applyDriver')}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                id="btn-learn-more"
                onClick={() => onNavigateToSection('how-it-works')}
                className="liquid-glass border border-[#19D9E0]/20 text-white hover:border-[#19D9E0]/50 hover:bg-[#19D9E0]/5 px-8 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition duration-300 cursor-pointer active:scale-[0.98]"
              >
                {t('hero.howItWorks')}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
