import EcosystemWallet from '@rapidfire/id';
import { ancient8Sepolia } from 'viem/chains';

export const ecosystemWalletInstance = new EcosystemWallet({
    appChainIds: [ancient8Sepolia.id],
    appLogoUrl: 'https://a.rgbimg.com/users/b/ba/barunpatro/600/mf6B5Gq.jpg',
    appName: 'Example App',
});