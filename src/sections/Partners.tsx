import { useEffect, useRef, useState } from 'react';

const partners = [
  { name: 'Solana', color: '#9945FF' },
  { name: 'Phantom', color: '#AB9FF2' },
  { name: 'Arweave', color: '#4ADE80' },
  { name: 'IPFS', color: '#65A3FF' },
  { name: 'USDC', color: '#2775CA' },
  { name: 'Tensor', color: '#FF6B6B' },
];

export default function Partners() {
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
      className="relative w-full py-16 md:py-20 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2
          className={`text-center text-lg text-[#A9B2C5] mb-10 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Powered by leading blockchain infrastructure
        </h2>

        {/* Partner Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`group flex items-center space-x-3 px-6 py-4 rounded-xl bg-[#111827] border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-pointer ${
                isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: `${index * 60}ms`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${partner.color}20` }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: partner.color }}
                >
                  {partner.name[0]}
                </span>
              </div>
              <span className="text-white font-medium group-hover:text-purple-400 transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
