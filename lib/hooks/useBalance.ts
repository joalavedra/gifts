import { useState } from 'react';

export function useBalance(initialBalance = 50) {
  const [balance, setBalance] = useState(initialBalance);

  const addBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const subtractBalance = (amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  return {
    balance,
    addBalance,
    subtractBalance
  };
}