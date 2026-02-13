import { useState, useEffect } from 'react';
import { Wallet, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useTheme } from '../context/ThemeContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const walletOptions = [
  { name: 'Phantom', icon: '👻', color: '#AB9FF2' },
  { name: 'Solflare', icon: '🔥', color: '#FC4C4C' },
  { name: 'Slope', icon: '📈', color: '#9945FF' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const { isConnected, publicKey, disconnect, isConnecting } = useWallet();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const formatPublicKey = (key: string) => {
    return `${key.slice(0, 6)}...${key.slice(-4)}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0F1F]/90 backdrop-blur-lg border-b border-purple-500/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">Synthera</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('browse')}
                className="text-[#A9B2C5] hover:text-white transition-colors text-sm font-medium"
              >
                Browse
              </button>
              <button
                onClick={() => scrollToSection('developers')}
                className="text-[#A9B2C5] hover:text-white transition-colors text-sm font-medium"
              >
                Sell
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="text-[#A9B2C5] hover:text-white transition-colors text-sm font-medium"
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-[#A9B2C5] hover:text-white transition-colors text-sm font-medium"
              >
                Docs
              </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-[#A9B2C5] hover:text-white hover:bg-white/5 transition-all"
              >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Wallet button */}
              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={disconnect}
                    className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 transition-all"
                  >
                    <Wallet size={16} />
                    <span className="text-sm font-medium mono">
                      {formatPublicKey(publicKey || '')}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsWalletDialogOpen(true)}
                  disabled={isConnecting}
                  className="btn-primary flex items-center space-x-2 text-sm"
                >
                  <Wallet size={16} />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#A9B2C5] hover:text-white hover:bg-white/5 transition-all"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0B0F1F]/95 backdrop-blur-lg border-t border-purple-500/20">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('browse')}
                className="block w-full text-left px-4 py-2 text-[#A9B2C5] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Browse
              </button>
              <button
                onClick={() => scrollToSection('developers')}
                className="block w-full text-left px-4 py-2 text-[#A9B2C5] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Sell
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="block w-full text-left px-4 py-2 text-[#A9B2C5] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-4 py-2 text-[#A9B2C5] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                Docs
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Wallet Connection Dialog */}
      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent className="bg-[#111827] border border-purple-500/30 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Connect Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {walletOptions.map((wallet) => (
              <WalletOption
                key={wallet.name}
                {...wallet}
                onClick={() => {
                  setIsWalletDialogOpen(false);
                }}
              />
            ))}
          </div>
          <p className="text-xs text-[#A9B2C5] text-center mt-4">
            By connecting, you agree to Synthera&apos;s Terms of Service
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

function WalletOption({
  name,
  icon,
  onClick,
}: {
  name: string;
  icon: string;
  onClick: () => void;
}) {
  const { connect } = useWallet();

  const handleClick = async () => {
    onClick();
    await connect(name);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#0B0F1F] border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{name}</span>
      <ChevronDown className="ml-auto rotate-[-90deg] w-4 h-4 text-[#A9B2C5]" />
    </button>
  );
}
