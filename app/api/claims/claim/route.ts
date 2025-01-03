import { NextResponse } from 'next/server';
import { claimGift } from '@/lib/utils/gift-claims';

export async function POST(request: Request) {
  try {
    const { id, claimedBy } = await request.json();
    
    if (!id || !claimedBy) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    const claim = claimGift(id, claimedBy);
    
    if (!claim) {
      return NextResponse.json({ 
        success: false, 
        error: 'Gift has already been claimed or does not exist' 
      }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: claim });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to claim gift' 
    }, { status: 500 });
  }
}