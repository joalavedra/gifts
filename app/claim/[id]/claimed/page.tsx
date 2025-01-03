"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ClaimedPage() {
  return (
    <main className="min-h-screen bg-[#E60012] text-white p-4">
      <div className="max-w-md mx-auto">
        <Card className="bg-[#ffffff20] border-none p-8 text-center space-y-6">
          <h1 className="text-3xl mb-8">Already claimed</h1>
          
          <div className="text-8xl mb-8">
            🎁
          </div>

          <p className="text-sm opacity-80 mb-8">
            This gift has already been claimed. Create your own account to start sending gifts!
          </p>

          <Link href="/app">
            <Button 
              className="w-full bg-white text-[#E60012] hover:bg-white/90"
            >
              Back to gifting
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}