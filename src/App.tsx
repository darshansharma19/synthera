import { useEffect, useState } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import BrowseModels from './sections/BrowseModels';
import TestSandbox from './sections/TestSandbox';
import LicenseCheckout from './sections/LicenseCheckout';
import HowItWorks from './sections/HowItWorks';
import ForDevelopers from './sections/ForDevelopers';
import AnalyticsDashboard from './sections/AnalyticsDashboard';
import Community from './sections/Community';
import SecurityTrust from './sections/SecurityTrust';
import Partners from './sections/Partners';
import FAQ from './sections/FAQ';
import CTAFooter from './sections/CTAFooter';
import { WalletProvider } from './context/WalletContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#0B0F1F] flex items-center justify-center z-50">
        <div className="animate-pulse">
          <div className="text-3xl font-bold text-gradient">Synthera</div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WalletProvider>
        <div className="relative min-h-screen bg-[#0B0F1F]">
          {/* Grain overlay */}
          <div className="grain-overlay" />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main content */}
          <main className="relative">
            <Hero />
            <BrowseModels />
            <TestSandbox />
            <LicenseCheckout />
            <HowItWorks />
            <ForDevelopers />
            <AnalyticsDashboard />
            <Community />
            <SecurityTrust />
            <Partners />
            <FAQ />
            <CTAFooter />
          </main>
        </div>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
