import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Twitter, MessageCircle, Mail } from 'lucide-react';

const footerLinks = {
  Product: ['Browse Models', 'Sell Models', 'Pricing', 'API Docs'],
  Developers: ['Upload Guide', 'SDK', 'Smart Contracts', 'GitHub'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit'],
  Legal: ['Terms of Service', 'Privacy Policy', 'License Agreement'],
};

export default function CTAFooter() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      {/* CTA Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`relative bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl border border-purple-500/30 p-10 md:p-16 text-center overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
          }`}
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to license your first model?
            </h2>
            <p className="text-lg text-[#A9B2C5] mb-8 max-w-xl mx-auto">
              Join thousands of developers and buyers in the future of AI model marketplace
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('browse')}
                className="btn-primary flex items-center space-x-2 group"
              >
                <span>Browse Models</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('developers')}
                className="btn-secondary"
              >
                Start Selling
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div
              className={`col-span-2 md:col-span-1 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-white">Synthera</span>
              </div>
              <p className="text-sm text-[#A9B2C5] mb-4">
                AI models, on-chain. Browse, test, and license in seconds.
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#111827] flex items-center justify-center text-[#A9B2C5] hover:text-white hover:bg-purple-500/20 transition-all"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#111827] flex items-center justify-center text-[#A9B2C5] hover:text-white hover:bg-purple-500/20 transition-all"
                >
                  <Github size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#111827] flex items-center justify-center text-[#A9B2C5] hover:text-white hover:bg-purple-500/20 transition-all"
                >
                  <MessageCircle size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#111827] flex items-center justify-center text-[#A9B2C5] hover:text-white hover:bg-purple-500/20 transition-all"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links], catIndex) => (
              <div
                key={category}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${300 + catIndex * 80}ms` }}
              >
                <h3 className="text-white font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#A9B2C5] hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-purple-500/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-[#A9B2C5] mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Synthera. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-[#A9B2C5]">Powered by Solana</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}