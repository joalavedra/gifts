import { giftTokenAbi } from './abis/giftToken';

export const CONTRACTS = {
  GIFT_TOKEN: {
    address: "0xa033deF9Bde128b7A256A3c9f8629A37c8226B88" as const,
    abi: giftTokenAbi
  },
  USDC: {
    address: "0x42847D8FAff45c72A92Cce9458Fe622001463dF0" as const
  }
} as const;