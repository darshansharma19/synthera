import React, { createContext, useContext, useState, useCallback } from 'react';

interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  walletType: string | null;
  balance: number;
  connect: (walletType: string) => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async (type: string) => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock public key
    const mockPublicKey = `${type.slice(0, 3).toLowerCase()}${Array(32).fill(0).map(() => 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]
    ).join('')}`;
    
    setPublicKey(mockPublicKey);
    setWalletType(type);
    setBalance(Math.random() * 50 + 10);
    setIsConnected(true);
    setIsConnecting(false);
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setPublicKey(null);
    setWalletType(null);
    setBalance(0);
  }, []);

  return (
    <WalletContext.Provider value={{
      isConnected,
      publicKey,
      walletType,
      balance,
      connect,
      disconnect,
      isConnecting
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
