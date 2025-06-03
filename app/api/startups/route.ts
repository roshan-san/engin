import { NextRequest, NextResponse } from 'next/server';
import { getStartups } from '@/app/(platform)/startups/server/actions';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = parseInt(searchParams.get('limit') || '10');

    const data = await getStartups(cursor, limit, search);
    
    // Ensure the response matches the expected structure
    if (!data || !Array.isArray(data.startups)) {
      throw new Error('Invalid data structure returned from getStartups');
    }

    return NextResponse.json({
      startups: data.startups,
      nextCursor: data.nextCursor
    });
  } catch (error) {
    console.error('Error fetching startups:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch startups',
        startups: [],
        nextCursor: null
      },
      { status: 500 }
    );
  }
} 