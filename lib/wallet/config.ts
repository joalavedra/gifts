import EcosystemWallet from '@rapidfire/id';

// Initialize SDK with consistent configuration
export const sdk = new EcosystemWallet({
  appChainIds: [80002], // Base testnet
  appLogoUrl: '/gift-quest-logo.png',
  appName: 'GiftQuest',
});

let provider: any = null;

export function getProvider() {
  if (!provider) {
    provider = sdk.getEthereumProvider({
      policy: process.env.NEXT_PUBLIC_POLICY_ID
    });
  }
  return provider;
}

export function resetProvider() {
  provider = null;
}