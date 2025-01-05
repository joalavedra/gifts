"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function ClaimedPage() {
  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass-card border-none p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-mono text-orange-500">Already Claimed</h1>
            <div className="w-10" />
          </div>
          
          <motion.div 
            className="text-8xl text-center"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🎁
          </motion.div>

          <p className="text-sm font-mono text-white/80 text-center">
             
          </p>

          <Link href="/">
            <Button 
              className="w-full glass-button hover:bg-white/20 text-white py-6 font-mono"
            >
              Send a Gift
            </Button>
          </Link>
        </Card>
      </motion.div>
    </main>
  );
}