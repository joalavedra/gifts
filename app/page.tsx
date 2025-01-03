"use client";

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ConnectButton } from '@/components/wallet/ConnectButton';

export default function WelcomePage() {
  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <Card className="glass-card border-none text-center p-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          >
            <div className="text-8xl mb-8">🎁</div>
            <h1 className="text-2xl mb-8 font-mono text-orange-500">GiftQuest</h1>
          </motion.div>
          
          <ConnectButton />
        </Card>
      </motion.div>
    </main>
  );
}