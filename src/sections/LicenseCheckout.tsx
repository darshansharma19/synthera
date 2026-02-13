import { useState, useEffect, useRef } from 'react';
import { Check, Wallet, Info, ArrowRight } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const licenseTypes = [
  { id: 'personal', name: 'Personal', price: 12, description: 'For individual use only' },
  { id: 'commercial', name: 'Commercial', price: 24, description: 'For business and commercial projects' },
  { id: 'enterprise', name: 'Enterprise', price: 99, description: 'Unlimited team usage + support' },
];

export default function LicenseCheckout() {
  const [selectedLicense, setSelectedLicense] = useState('commercial');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { isConnected, connect } = useWallet();

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

  const selectedLicenseData = licenseTypes.find(l => l.id === selectedLicense);
  const royaltyAmount = selectedLicenseData ? (selectedLicenseData.price * 0.08).toFixed(2) : '0';

  const handlePurchase = async () => {
    if (!isConnected) {
      setIsDialogOpen(true);
      return;
    }

    setIsPurchasing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPurchasing(false);
    setPurchaseComplete(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 bg-[#0B0F1F]"
      style={{ zIndex: 20 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative bg-[#111827] rounded-3xl border border-purple-500/30 p-8 md:p-10 glow-purple transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ perspective: '1000px' }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              License in <span className="text-gradient">one click</span>
            </h2>
            <p className="text-[#A9B2C5]">
              Choose your license type and get instant access
            </p>
          </div>

          {/* License Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {licenseTypes.map((license) => (
              <button
                key={license.id}
                onClick={() => setSelectedLicense(license.id)}
                className={`relative p-5 rounded-xl border transition-all text-left ${
                  selectedLicense === license.id
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-purple-500/20 bg-[#0B0F1F] hover:border-purple-500/40'
                }`}
              >
                {selectedLicense === license.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <div className="text-sm text-[#A9B2C5] mb-1">{license.name}</div>
                <div className="text-2xl font-bold text-white mb-2">
                  ${license.price}
                </div>
                <div className="text-xs text-[#A9B2C5]">{license.description}</div>
              </button>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="bg-[#0B0F1F] rounded-xl p-5 mb-6 border border-purple-500/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#A9B2C5]">License Price</span>
              <span className="text-white font-medium mono">
                ${selectedLicenseData?.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#A9B2C5] flex items-center">
                Platform Fee (2%)
                <Info size={14} className="ml-1 text-[#A9B2C5]/60" />
              </span>
              <span className="text-white font-medium mono">
                ${(selectedLicenseData?.price || 0 * 0.02).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-400 flex items-center">
                Creator Royalty (8%)
                <Info size={14} className="ml-1 text-cyan-400/60" />
              </span>
              <span className="text-cyan-400 font-medium mono">${royaltyAmount}</span>
            </div>
            <div className="border-t border-purple-500/20 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-2xl font-bold text-white mono">
                  ${((selectedLicenseData?.price || 0) * 1.1).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-[#A9B2C5]">
              <Wallet size={16} />
              <span>Pay with USDC or USDT</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-sm text-green-400">Solana Network</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handlePurchase}
            disabled={isPurchasing || purchaseComplete}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2 ${
              purchaseComplete
                ? 'bg-green-500 text-white'
                : 'btn-primary'
            }`}
          >
            {isPurchasing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : purchaseComplete ? (
              <>
                <Check size={20} />
                <span>Purchase Complete!</span>
              </>
            ) : (
              <>
                <span>{isConnected ? 'Buy License' : 'Connect Wallet to Buy'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Wallet Connect Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#111827] border border-purple-500/30 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Connect Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {['Phantom', 'Solflare', 'Slope'].map((wallet) => (
              <button
                key={wallet}
                onClick={async () => {
                  setIsDialogOpen(false);
                  await connect(wallet);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#0B0F1F] border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
              >
                <span className="text-2xl">
                  {wallet === 'Phantom' ? '👻' : wallet === 'Solflare' ? '🔥' : '📈'}
                </span>
                <span className="font-medium">{wallet}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
