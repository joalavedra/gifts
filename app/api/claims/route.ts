import { NextResponse } from 'next/server';
import { createGiftClaim, getGiftClaim, claimGift } from '@/lib/utils/gift-claims';
import type { CreateGiftClaimInput } from '@/lib/types/gift-claim';

export async function POST(request: Request) {
  try {
    const input: CreateGiftClaimInput = await request.json();
    const claim = createGiftClaim(input);
    
    return NextResponse.json({ 
      success: true, 
      data: claim,
      claimUrl: `${process.env.NEXT_PUBLIC_APP_URL}/claim/${claim.id}`
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create claim' 
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ 
      success: false, 
      error: 'Claim ID is required' 
    }, { status: 400 });
  }

  const claim = getGiftClaim(id);
  
  if (!claim) {
    return NextResponse.json({ 
      success: false, 
      error: 'Claim not found' 
    }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: claim });
}