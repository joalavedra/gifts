export const WALLET_ERRORS = {
  USER_REJECTED: 4001,
  UNAUTHORIZED: 4100,
  UNSUPPORTED_METHOD: 4200,
  DISCONNECTED: 4900,
  CHAIN_DISCONNECTED: 4901
} as const;

export function getWalletErrorMessage(error: any): string {
  switch (error.code) {
    case WALLET_ERRORS.USER_REJECTED:
      return 'Connection rejected. Please try again.';
    case WALLET_ERRORS.UNAUTHORIZED:
      return 'Wallet is not authorized.';
    case WALLET_ERRORS.UNSUPPORTED_METHOD:
      return 'This wallet method is not supported.';
    case WALLET_ERRORS.DISCONNECTED:
      return 'Wallet is disconnected.';
    case WALLET_ERRORS.CHAIN_DISCONNECTED:
      return 'Chain is disconnected.';
    default:
      return 'Failed to connect wallet. Please try again later.';
  }
}