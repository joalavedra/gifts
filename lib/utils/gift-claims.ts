import { nanoid } from 'nanoid';
import type { GiftClaim, CreateGiftClaimInput } from '../types/gift-claim';

// In-memory store for development
const giftClaimsStore = new Map<string, GiftClaim>();

export function generateClaimId(): string {
  return nanoid(10); // Generate a short, unique ID
}

export function createGiftClaim(input: CreateGiftClaimInput): GiftClaim {
  const id = generateClaimId();
  const claim: GiftClaim = {
    id,
    giftId: input.giftId,
    quantity: input.quantity,
    claimed: false,
    createdAt: new Date(),
    createdBy: input.createdBy,
  };
  
  giftClaimsStore.set(id, claim);
  return claim;
}

export function getGiftClaim(id: string): GiftClaim | undefined {
  return giftClaimsStore.get(id);
}

export function claimGift(id: string, claimedBy: string): GiftClaim | null {
  const claim = giftClaimsStore.get(id);
  
  if (!claim || claim.claimed) {
    return null;
  }

  const updatedClaim: GiftClaim = {
    ...claim,
    claimed: true,
    claimedAt: new Date(),
    claimedBy
  };

  giftClaimsStore.set(id, updatedClaim);
  return updatedClaim;
}

export function isGiftClaimed(id: string): boolean {
  const claim = giftClaimsStore.get(id);
  return claim?.claimed ?? false;
}