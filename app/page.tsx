"use client";

import { motion } from 'framer-motion';
import { WalletConnect } from '@/components/wallet/WalletConnect';

export default function WelcomePage() {
  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >    
        <WalletConnect />
      </motion.div>
    </main>
  );
}