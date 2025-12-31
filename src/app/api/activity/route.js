import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'buy', 'claim', 'all'
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

    // Build query
    let query = supabase
      .from('wallet_activities')
      .select(`
        id,
        wallet_id,
        activity_type,
        activity_description,
        transaction_signature,
        amount_sol,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filter by activity type
    if (type === 'buy') {
      query = query.or('activity_type.ilike.%buy%,activity_type.ilike.%bought%');
    } else if (type === 'claim') {
      query = query.ilike('activity_type', '%claim%');
    }

    // Only get successful activities (exclude failed)
    query = query.not('activity_type', 'ilike', '%failed%');

    const { data: activities, error } = await query;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Optionally fetch token info for each activity
    // This joins token name if available
    const enrichedActivities = activities.map(activity => {
      // Extract token name from description if possible
      let tokenName = null;
      if (activity.activity_description) {
        // Try to extract token name from patterns like "Bought own token (TokenName)"
        const match = activity.activity_description.match(/\(([^)]+)\)/);
        if (match) {
          tokenName = match[1];
        }
      }
      
      return {
        ...activity,
        token_name: tokenName
      };
    });

    return NextResponse.json({
      success: true,
      activities: enrichedActivities,
      count: enrichedActivities.length
    });

  } catch (error) {
    console.error('Activities API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}