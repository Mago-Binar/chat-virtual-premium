'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TokensContextType {
  tokens: number;
  addTokens: (amount: number) => void;
  deductTokens: (amount: number) => boolean;
  setTokens: (amount: number) => void;
}

const TokensContext = createContext<TokensContextType | undefined>(undefined);

export function TokensProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokensState] = useState<number>(10); // Default value
  const [mounted, setMounted] = useState(false);

  // Load tokens from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTokens = localStorage.getItem('euana-tokens');
    if (savedTokens) {
      setTokensState(parseInt(savedTokens, 10));
    } else {
      // Default tokens for new users
      localStorage.setItem('euana-tokens', '10');
    }
  }, []);

  // Save tokens to localStorage whenever they change (only after mounted)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('euana-tokens', tokens.toString());
    }
  }, [tokens, mounted]);

  const addTokens = (amount: number) => {
    setTokensState(prev => prev + amount);
  };

  const deductTokens = (amount: number): boolean => {
    if (tokens >= amount) {
      setTokensState(prev => prev - amount);
      return true;
    }
    return false;
  };

  const setTokens = (amount: number) => {
    setTokensState(amount);
  };

  return (
    <TokensContext.Provider value={{ tokens, addTokens, deductTokens, setTokens }}>
      {children}
    </TokensContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokensContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokensProvider');
  }
  return context;
}
