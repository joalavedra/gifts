"use client";

import { RapidFireLogo } from "../ui/rapid-fire-logo";
import { Button } from "../ui/button";
import { WalletStatus } from "./WalletStatus";
import { useAccount, useConnect } from "wagmi";
import { useCallback, useEffect } from "react";
import { ecosystemWalletInstance } from "../../app/utils/ecosystemWallet";

export function WalletConnect() {
  useEffect(() => {
    // Log if window.ethereum exists
    console.log('Ethereum provider:', window.ethereum);
    
    try {
      const provider = ecosystemWalletInstance.getEthereumProvider({
        policy: process.env.NEXT_PUBLIC_POLICY_ID,
      });
      console.log("Provider initialized:", provider);
    } catch (error) {
      console.error("Failed to initialize provider:", error);
    }
  }, []);
  
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  
  const connectWallet = useCallback(async () => {
    console.log("Button clicked, attempting to connect...");
    console.log("Available connectors:", connectors.map(c => ({ id: c.id, name: c.name })));
    
    // Try to find either the specific connector or any injected connector
    const connector = connectors.find(
      (c) => c.id === 'com.rapidfire.id' || c.id === 'injected' || c.name.toLowerCase().includes('injected')
    );
    
    if (connector) {
      console.log("Found connector:", connector.id, connector.name);
      try {
        await connect({ connector });
        console.log("Connection successful!");
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      console.error("No suitable connector found");
      console.log("Available connector IDs:", connectors.map(c => c.id));
    }
  }, [connectors, connect]);

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        className="mx-auto flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
      >
        <RapidFireLogo className="w-4 h-4" /> Sign in with Rapid Fire
      </Button>
    );
  }

  return <WalletStatus />;
}