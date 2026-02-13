import { useEffect, useRef, useState } from 'react';
import { Shield, Lock, FileCheck, Fingerprint, Eye, Scale } from 'lucide-react';

const trustFeatures = [
  {
    icon: Fingerprint,
    title: 'On-chain Provenance',
    description: 'Every model is verified and tracked on the Solana blockchain',
    color: 'purple',
  },
  {
    icon: Lock,
    title: 'Signed Model Weights',
    description: 'Cryptographic signatures ensure model integrity',
    color: 'cyan',
  },
  {
    icon: Scale,
    title: 'Immutable License Terms',
    description: 'Smart contracts enforce usage rights automatically',
    color: 'purple',
  },
];

const securityStats = [
  { label: 'Models Verified', value: '15,000+' },
  { label: 'Total Value Locked', value: '$2.4M' },
  { label: 'Successful Transactions', value: '98.9%' },
  { label: 'Average Settlement', value: '<2s' },
];

export default function SecurityTrust() {
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
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Shield size={16} className="text-green-400" />
            <span className="text-sm text-green-400">Security First</span>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Verify <span className="text-gradient">everything</span>
          </h2>
          <p
            className={`text-[#A9B2C5] max-w-xl mx-auto transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Built on Solana for transparency, speed, and security. Every transaction 
            and model is verifiable on-chain.
          </p>
        </div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {trustFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-[#111827] rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 text-center ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center ${
                  feature.color === 'purple'
                    ? 'bg-purple-500/20'
                    : 'bg-cyan-500/20'
                }`}
              >
                <feature.icon
                  size={28}
                  className={feature.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'}
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#A9B2C5]">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Security Stats */}
        <div
          className={`bg-[#111827] rounded-2xl border border-purple-500/20 p-6 md:p-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${700 + index * 80}ms`
                }}
              >
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[#A9B2C5]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#A9B2C5] transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="flex items-center space-x-2">
            <Eye size={16} className="text-purple-400" />
            <span>Open source smart contracts</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileCheck size={16} className="text-cyan-400" />
            <span>Audited by leading security firms</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock size={16} className="text-green-400" />
            <span>End-to-end encryption</span>
          </div>
        </div>
      </div>
    </section>
  );
}
