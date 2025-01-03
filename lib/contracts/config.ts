import { giftTokenAbi } from './abis/giftToken';

export const CONTRACTS = {
  GIFT_TOKEN: {
    address: "0x119Ea671030FBf79AB93b436D2E20af6ea469a19" as const,
    abi: giftTokenAbi
  },
  USDC: {
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA" as const
  }
} as const;