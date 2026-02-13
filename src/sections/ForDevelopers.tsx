import { useEffect, useRef, useState } from 'react';
import { Upload, Check, Coins, Users, Server, ArrowRight, FileUp, Tag, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Mint as NFT',
    description: 'One transaction to tokenize your model on Solana',
  },
  {
    icon: Coins,
    title: 'Set Royalties',
    description: 'Earn every time your model is licensed',
  },
  {
    icon: Users,
    title: 'Reach Buyers',
    description: 'No infrastructure needed — we handle distribution',
  },
  {
    icon: Server,
    title: 'Hosted Inference',
    description: 'We run the compute, you collect the revenue',
  },
];

export default function ForDevelopers() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
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

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleMint = () => {
    setIsMinted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="developers"
      className="relative w-full py-20 md:py-28 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Features */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ship your model.{' '}
                <span className="text-gradient">Keep the upside.</span>
              </h2>
              <p className="text-lg text-[#A9B2C5]">
                Turn your AI models into revenue streams with on-chain ownership 
                and automated royalties.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start space-x-4 p-4 rounded-xl bg-[#111827] border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 120}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#A9B2C5]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`btn-primary flex items-center space-x-2 group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <span>Start Uploading</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Upload Card */}
          <div
            className={`relative bg-[#111827] rounded-2xl border border-cyan-500/30 overflow-hidden glow-cyan transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/20">
              <span className="text-sm text-[#A9B2C5] mono">Upload Model</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Ready</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Drop Zone */}
              <div
                onClick={!isUploading && uploadProgress === 0 ? handleUpload : undefined}
                className={`relative aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  uploadProgress === 100
                    ? 'border-green-500/50 bg-green-500/10'
                    : isUploading
                    ? 'border-purple-500/50 bg-purple-500/10'
                    : 'border-purple-500/30 hover:border-purple-500/50 bg-[#0B0F1F]'
                }`}
              >
                {uploadProgress === 100 ? (
                  <>
                    <Check size={32} className="text-green-400 mb-2" />
                    <p className="text-sm text-green-400">Upload Complete</p>
                  </>
                ) : isUploading ? (
                  <>
                    <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin mb-2" />
                    <p className="text-sm text-purple-400">Uploading... {uploadProgress}%</p>
                  </>
                ) : (
                  <>
                    <FileUp size={32} className="text-[#A9B2C5] mb-2" />
                    <p className="text-sm text-[#A9B2C5]">Click to upload model files</p>
                    <p className="text-xs text-[#A9B2C5]/60 mt-1">.onnx, .pt, .h5 up to 2GB</p>
                  </>
                )}
              </div>

              {/* Metadata Fields */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-[#0B0F1F] border border-purple-500/20">
                  <Tag size={16} className="text-[#A9B2C5]" />
                  <input
                    type="text"
                    placeholder="Model name"
                    className="bg-transparent text-white text-sm w-full outline-none placeholder:text-[#A9B2C5]/60"
                  />
                </div>
                <div className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-[#0B0F1F] border border-purple-500/20">
                  <DollarSign size={16} className="text-[#A9B2C5]" />
                  <input
                    type="text"
                    placeholder="Price in USD"
                    className="bg-transparent text-white text-sm w-full outline-none placeholder:text-[#A9B2C5]/60"
                  />
                </div>
              </div>

              {/* Mint Button */}
              <button
                onClick={handleMint}
                disabled={uploadProgress < 100 || isMinted}
                className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isMinted
                    ? 'bg-green-500 text-white'
                    : uploadProgress === 100
                    ? 'btn-primary'
                    : 'bg-[#0B0F1F] text-[#A9B2C5] cursor-not-allowed'
                }`}
              >
                {isMinted ? (
                  <>
                    <Check size={18} />
                    <span>Minted Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Mint as NFT</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
