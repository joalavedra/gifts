"use client";

import { RapidFireLogo } from "../ui/rapid-fire-logo";
import { Button } from "../ui/button";
import { WalletStatus } from "./WalletStatus";
import { useAccount, useConnect } from "wagmi";
import { useCallback, useEffect } from "react";
import { ecosystemWalletInstance } from "../../app/utils/ecosystemWallet";

export function WalletConnect() {
  useEffect(() => {
    ecosystemWalletInstance.getEthereumProvider({
      policy: process.env.NEXT_PUBLIC_POLICY_ID,
    });
  }, []);
  
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  
  const connectWallet = useCallback(async () => {
    console.log("Button clicked, attempting to connect...");
    const injectedConnector = connectors.find(
      (connector) => connector.id === 'com.rapidfire.id'
    );
    if (injectedConnector) {
      try {
        await connect({ connector: injectedConnector });
        console.log("Connection successful!");
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      console.error("Injected connector not found.");
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