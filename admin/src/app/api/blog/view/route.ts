import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const { postId, userIdentifier } = await request.json();

    if (!postId || !userIdentifier) {
      return NextResponse.json(
        { error: 'Post ID and user identifier are required' },
        { status: 400 }
      );
    }

    // Add view (will be ignored if already exists due to unique constraint)
    const { error: insertError } = await supabase
      .from('blog_interactions')
      .insert({
        post_id: postId,
        user_identifier: userIdentifier,
        interaction_type: 'view'
      });

    // Don't treat duplicate view as error
    if (insertError && !insertError.message.includes('duplicate key')) {
      console.error('Error adding view:', insertError);
      return NextResponse.json(
        { error: 'Failed to add view' },
        { status: 500 }
      );
    }

    // Get updated view count
    const { data: viewCount, error: countError } = await supabase
      .from('blog_interactions')
      .select('id', { count: 'exact' })
      .eq('post_id', postId)
      .eq('interaction_type', 'view');

    if (countError) {
      console.error('Error getting view count:', countError);
      return NextResponse.json(
        { error: 'Failed to get view count' },
        { status: 500 }
      );
    }

    // Update the blog_posts table
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ view_count: viewCount?.length || 0 })
      .eq('id', postId);

    if (updateError) {
      console.error('Error updating view count:', updateError);
    }

    return NextResponse.json({
      success: true,
      viewCount: viewCount?.length || 0
    });

  } catch (error) {
    console.error('Error in view API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get view count
    const { data: viewCount, error: countError } = await supabase
      .from('blog_interactions')
      .select('id', { count: 'exact' })
      .eq('post_id', postId)
      .eq('interaction_type', 'view');

    if (countError) {
      console.error('Error getting view count:', countError);
      return NextResponse.json(
        { error: 'Failed to get view count' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      viewCount: viewCount?.length || 0
    });

  } catch (error) {
    console.error('Error in view GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
