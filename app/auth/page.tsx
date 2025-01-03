"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Twitter, Mail } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();

  const handleAuth = (provider: string) => {
    // Simulate authentication
    setTimeout(() => {
      router.push('/app');
    }, 1000);
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <Card className="glass-card border-none text-center p-8">
          <h1 className="text-2xl mb-8 font-mono text-orange-500">Connect Account</h1>
          
          <div className="space-y-4">
            <Button 
              onClick={() => handleAuth('google')}
              className="w-full glass-button hover:bg-white/20 text-white gap-3 py-6"
            >
              <Mail className="h-5 w-5" />
              Continue with Google
            </Button>

            <Button 
              onClick={() => handleAuth('twitter')}
              className="w-full glass-button hover:bg-white/20 text-white gap-3 py-6"
            >
              <Twitter className="h-5 w-5" />
              Continue with Twitter
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/60 font-mono">
            Choose your preferred login method
          </p>
        </Card>
      </motion.div>
    </main>
  );
}