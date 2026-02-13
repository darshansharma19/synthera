import { useEffect, useRef, useState } from 'react';
import { Search, Play, FileCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Browse',
    description: 'Filter by task, rating, and provenance. Discover AI models verified on Solana.',
    icon: Search,
    color: 'purple',
  },
  {
    number: '02',
    title: 'Test',
    description: 'Run inference in the sandbox before you buy. No setup required.',
    icon: Play,
    color: 'cyan',
  },
  {
    number: '03',
    title: 'License',
    description: 'Pay with stablecoins. NFT license delivered to your wallet instantly.',
    icon: FileCheck,
    color: 'purple',
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-white text-center mb-16 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          How it <span className="text-gradient">works</span>
        </h2>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <svg
            className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 hidden lg:block"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <path
              d="M 100 4 L 400 4 L 700 4"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                strokeDasharray: 1000,
                strokeDashoffset: isVisible ? 0 : 1000,
                transition: 'stroke-dashoffset 1.5s ease-out'
              }}
            />
          </svg>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-[#111827] rounded-2xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all h-full">
                  {/* Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-purple-500/20">
                      {step.number}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        step.color === 'purple'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      <step.icon size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#A9B2C5] leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex items-center justify-center mt-6 lg:hidden">
                      <ArrowRight size={20} className="text-purple-500/40" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
