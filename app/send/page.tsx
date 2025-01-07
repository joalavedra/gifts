"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Copy, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { useAccount } from 'wagmi';
import { BaseError, createWalletClient, custom } from 'viem';
import { ancient8Sepolia } from 'viem/chains';
import { erc7715Actions } from 'viem/experimental';
import { CONTRACTS } from '@/lib/contracts/config';
import { useSearchParams } from 'next/navigation';

interface Asset {
  id: number;
  name: string;
  price: number;
  emoji: string;
  owned: number;
  quantity: number;
}

export default function SendPage() {
  const [isCopying, setIsCopying] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const { connector, address } = useAccount();
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const [sessionError, setSessionError] = useState<BaseError | null>(null);
  const [asset, setAsset] = useState<Asset | null>(null);
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const parseAsset = () => {
      const assetParam = searchParams.get('asset');
      if (!assetParam) return null;
      
      try {
        const parsed = JSON.parse(decodeURIComponent(assetParam)) as Asset;
        
        // Validate required fields
        if (
          typeof parsed.id !== 'number' ||
          typeof parsed.name !== 'string' ||
          typeof parsed.price !== 'number' ||
          typeof parsed.emoji !== 'string' ||
          typeof parsed.quantity !== 'number' ||
          parsed.quantity < 1
        ) {
          throw new Error('Invalid asset format');
        }
        
        setAsset(parsed);
      } catch (error) {
        console.error('Failed to parse asset:', error);
        setAsset(null);
      }
    };

    parseAsset();
  }, [searchParams]);

  const handleGrantPermissions = useCallback(async() => {
    if (!asset) return;
    
    setIsCreatingLink(true);
    try {
      const provider = await connector?.getProvider()
      const privateKey = generatePrivateKey();
      const accountSession = privateKeyToAccount(privateKey).address;
      setSessionKey(accountSession);
      
      const walletClient = createWalletClient({
        chain: ancient8Sepolia, 
        transport: custom(provider as any),
      }).extend(erc7715Actions());

      const permission = await walletClient.grantPermissions({
        signer:{
          type: "account",
          data:{
            id: accountSession
          }
        },
        expiry: 60 * 60 * 24,
        permissions: [
          {
            type: 'contract-call',
            data: {
              address: CONTRACTS.GIFT_TOKEN.address,
              calls: ["safeTransferFrom"]
            },
            policies: []
          }
        ],
      });

      // Encrypt the private key
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          privateKey,
          permissionsContext: permission.permissionsContext,
          assetId: asset.id,
          address: address
        })
      });

      if (!response.ok) {
        throw new Error('Failed to encrypt key');
      }

      const { encryptedData } = await response.json();
      const linkData = encodeURIComponent(JSON.stringify(encryptedData));
      const newLink = `${window.location.origin}/claim/${linkData}`;
      setGeneratedLink(newLink);

      // Store in localStorage with timestamp
      const storedLinks = JSON.parse(localStorage.getItem('giftLinks') || '[]');
      storedLinks.push({
        link: newLink,
        asset: asset.name,
        timestamp: Date.now(),
      });
      localStorage.setItem('giftLinks', JSON.stringify(storedLinks));

    } catch (e) {
      const error = e as BaseError;
      setSessionError(error);
      toast.error('Failed to create gift link');
    } finally {
      setIsCreatingLink(false);
    }
  }, [asset, connector, address]);

  const copyLink = async () => {
    if (!generatedLink) return;
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast.success('Gift link copied!');
    } catch (error) {
      toast.error('Failed to copy link');
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <main className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="glass-card border-none p-8 space-y-6">
          <PageHeader title="Send Gift" />

          {asset && (
            <div className="flex justify-center items-center">
              <div className="text-6xl mb-4">{asset.emoji}</div>
            </div>
          )}

          <div className="space-y-4 text-white/80 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-orange-500" />
              <p className="text-sm">
                {asset ? `1 ${asset.name} will be claimable` : 'No asset selected'}
              </p>
            </div>
            {generatedLink ? (
              <>
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4 text-orange-500" />
                  <p className="text-sm">Copy link and send to a friend</p>
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-orange-500" />
                  <p className="text-sm">View all your claim links</p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-orange-500" />
                <p className="text-sm">Create a new gift link</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {!generatedLink ? (
              <Button
                onClick={handleGrantPermissions}
                disabled={isCreatingLink || !asset}
                className="col-span-2 glass-button hover:bg-white/20 text-white font-mono"
              >
                {isCreatingLink ? 'Creating...' : 'Create link'}
              </Button>
            ) : (
              <>
                <Button
                  onClick={copyLink}
                  className="glass-button hover:bg-white/20 text-white font-mono"
                >
                  {isCopying ? 'Copied ✓' : 'Copy link'}
                </Button>
                <Link href="/history">
                  <Button
                    className="w-full glass-button hover:bg-white/20 text-white font-mono"
                  >
                    View links
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Card>
      </motion.div>
    </main>
  );
}