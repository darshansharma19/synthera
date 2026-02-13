import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Users } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBrowse = () => {
    const element = document.getElementById('browse');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDevelopers = () => {
    const element = document.getElementById('developers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero_city_bg.jpg)' }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1F]/95 via-[#0B0F1F]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1F]/80 via-transparent to-[#0B0F1F]/40" />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, transparent 0%, rgba(11, 15, 31, 0.5) 100%)'
        }}
      />

      {/* Neon network SVG overlay */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Network lines */}
        <g filter="url(#glow)">
          <line x1="10%" y1="20%" x2="25%" y2="35%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="25%" y1="35%" x2="40%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
          <line x1="40%" y1="25%" x2="55%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="55%" y1="40%" x2="70%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
          <line x1="70%" y1="30%" x2="85%" y2="45%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="15%" y1="50%" x2="30%" y2="65%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
          <line x1="30%" y1="65%" x2="50%" y2="55%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="50%" y1="55%" x2="65%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
          <line x1="65%" y1="70%" x2="80%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="20%" y1="75%" x2="45%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
          <line x1="45%" y1="85%" x2="60%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="60%" y1="75%" x2="75%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1" opacity="0.4" />
        </g>
        {/* Nodes */}
        <g filter="url(#glow)">
          <circle cx="10%" cy="20%" r="4" fill="#A855F7" opacity="0.8" />
          <circle cx="25%" cy="35%" r="5" fill="#A855F7" opacity="0.7" />
          <circle cx="40%" cy="25%" r="4" fill="#22D3EE" opacity="0.8" />
          <circle cx="55%" cy="40%" r="6" fill="#A855F7" opacity="0.7" />
          <circle cx="70%" cy="30%" r="4" fill="#22D3EE" opacity="0.8" />
          <circle cx="85%" cy="45%" r="5" fill="#A855F7" opacity="0.7" />
          <circle cx="15%" cy="50%" r="4" fill="#22D3EE" opacity="0.8" />
          <circle cx="30%" cy="65%" r="5" fill="#A855F7" opacity="0.7" />
          <circle cx="50%" cy="55%" r="6" fill="#22D3EE" opacity="0.8" />
          <circle cx="65%" cy="70%" r="4" fill="#A855F7" opacity="0.7" />
          <circle cx="80%" cy="60%" r="5" fill="#22D3EE" opacity="0.8" />
          <circle cx="20%" cy="75%" r="4" fill="#A855F7" opacity="0.7" />
          <circle cx="45%" cy="85%" r="5" fill="#22D3EE" opacity="0.8" />
          <circle cx="60%" cy="75%" r="4" fill="#A855F7" opacity="0.7" />
          <circle cx="75%" cy="85%" r="5" fill="#22D3EE" opacity="0.8" />
        </g>
      </svg>

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center"
        style={{ paddingLeft: '8vw' }}
      >
        <div className="max-w-xl">
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              color: '#FFFFFF',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 4px 40px rgba(0, 0, 0, 0.6)',
            }}
          >
            <span className="inline-block">AI</span>{' '}
            <span className="inline-block">models,</span>
            <br />
            <span className="inline-block text-gradient">on-chain.</span>
          </h1>

          <p
            className={`text-lg md:text-xl mb-8 max-w-md transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              color: '#E2E8F0',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            Browse, test, and license AI models minted as NFTs on Solana. 
            Instant inference. Transparent royalties.
          </p>

          <div
            className={`flex flex-wrap gap-4 mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={scrollToBrowse}
              className="btn-primary flex items-center space-x-2 group"
            >
              <span>Browse Models</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToDevelopers}
              className="btn-secondary"
            >
              Start Selling
            </button>
          </div>

          {/* Social proof */}
          <div
            className={`flex items-center space-x-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 border-2 border-[#0B0F1F] flex items-center justify-center"
                >
                  <Users size={14} className="text-white" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span 
                className="font-semibold"
                style={{ 
                  color: '#FFFFFF',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                12,400+
              </span>
              <span 
                className="ml-1"
                style={{ 
                  color: '#CBD5E1',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                models licensed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-90' : 'opacity-0'
        }`}
        style={{ color: '#94A3B8' }}
      >
        <span className="text-xs mb-2 tracking-wider">Scroll to explore</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
