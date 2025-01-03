export interface GiftClaim {
  id: string;
  giftId: number;
  quantity: number;
  claimed: boolean;
  claimedAt?: Date;
  claimedBy?: string;
  createdAt: Date;
  createdBy: string;
}

export interface CreateGiftClaimInput {
  giftId: number;
  quantity: number;
  createdBy: string;
}