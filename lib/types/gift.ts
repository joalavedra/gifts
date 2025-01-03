export interface Gift {
  id: number;
  name: string;
  price: number;
  emoji: string;
  description: string;
  owned?: number;
  quantity?: number;
}

export interface GiftAction {
  type: 'buy' | 'send' | 'redeem';
  icon: React.ElementType;
  label: string;
  handler: () => Promise<void>;
}