export const APP_NAME = 'GiftQuest';
export const APP_DESCRIPTION = 'Send virtual Christmas gifts to your loved ones';

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DEPOSIT: '/deposit',
  WITHDRAW: '/withdraw',
  HISTORY: '/history',
  ABOUT: '/about',
  SEND: '/send',
  CLAIM: '/claim'
} as const;

export const INITIAL_BALANCE = 50;
export const MIN_QUANTITY = 1;
export const TRANSACTION_SIMULATION_TIME = 1000; // ms