import EcosystemWallet from '@rapidfire/id';

export const sdk = new EcosystemWallet({
  appChainIds: [80002],
  appLogoUrl: '/gift-quest-logo.png',
  appName: 'GiftQuest',
});

export const getProvider = () => sdk.getEthereumProvider({
  policy: process.env.NEXT_PUBLIC_POLICY_ID
});