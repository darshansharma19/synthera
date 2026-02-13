import { useState, useEffect, useRef } from 'react';
import { Upload, Play, Check, Zap, Shield, Clock } from 'lucide-react';

export default function TestSandbox() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
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

  const handleTest = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Sandbox Panel */}
          <div
            className={`relative bg-[#111827] rounded-2xl border border-cyan-500/30 overflow-hidden glow-cyan transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-[#A9B2C5] mono">Inference Sandbox</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Input Area */}
              <div className="mb-4">
                <label className="text-sm text-[#A9B2C5] mb-2 block">Input</label>
                <div className="relative aspect-video bg-[#0B0F1F] rounded-xl border border-purple-500/20 flex items-center justify-center overflow-hidden">
                  {!hasResult ? (
                    <div className="text-center">
                      <Upload size={32} className="text-[#A9B2C5] mx-auto mb-2" />
                      <p className="text-sm text-[#A9B2C5]">Drop an image or click to upload</p>
                    </div>
                  ) : (
                    <img
                      src="/model_thumb_02.jpg"
                      alt="Result"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleTest}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Run Inference</span>
                      </>
                    )}
                  </button>
                  <button className="px-4 py-2.5 rounded-xl border border-purple-500/30 text-[#A9B2C5] hover:text-white hover:border-purple-500/60 transition-all">
                    Reset
                  </button>
                </div>
              </div>

              {/* Output */}
              {hasResult && (
                <div className="mt-4 p-4 bg-[#0B0F1F] rounded-xl border border-green-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Check size={16} className="text-green-400" />
                    <span className="text-sm text-green-400">Inference complete</span>
                  </div>
                  <p className="text-sm text-[#A9B2C5] mono">
                    Generated portrait with cyberpunk aesthetic. 512x512px. 2.3s latency.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Info Panel */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Test <span className="text-gradient">in-browser</span>
            </h2>

            <p className="text-lg text-[#A9B2C5]">
              Drop a sample and run inference instantly. Results include on-chain 
              provenance and verified model weights.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <Clock size={14} className="text-cyan-400" />
                <span className="text-sm text-cyan-400">~220ms latency</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                <Shield size={14} className="text-purple-400" />
                <span className="text-sm text-purple-400">Verified weights</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                <Zap size={14} className="text-green-400" />
                <span className="text-sm text-green-400">On-chain provenance</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {[
                'No setup required — test directly in your browser',
                'Compare multiple models side-by-side',
                'See real-time performance metrics',
                'Verify model authenticity on Solana',
              ].map((feature, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-purple-400" />
                  </div>
                  <span className="text-[#A9B2C5]">{feature}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary mt-4">
              License Model
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
