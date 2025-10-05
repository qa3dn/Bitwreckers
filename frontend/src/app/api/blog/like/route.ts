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

    // Check if user has already liked this post
    const { data: existingLike, error: checkError } = await supabase
      .from('blog_interactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_identifier', userIdentifier)
      .eq('interaction_type', 'like')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing like:', checkError);
      return NextResponse.json(
        { error: 'Failed to check existing like' },
        { status: 500 }
      );
    }

    let action = 'added';
    
    if (existingLike) {
      // Remove like
      const { error: deleteError } = await supabase
        .from('blog_interactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_identifier', userIdentifier)
        .eq('interaction_type', 'like');

      if (deleteError) {
        console.error('Error removing like:', deleteError);
        return NextResponse.json(
          { error: 'Failed to remove like' },
          { status: 500 }
        );
      }
      action = 'removed';
    } else {
      // Add like
      const { error: insertError } = await supabase
        .from('blog_interactions')
        .insert({
          post_id: postId,
          user_identifier: userIdentifier,
          interaction_type: 'like'
        });

      if (insertError) {
        console.error('Error adding like:', insertError);
        return NextResponse.json(
          { error: 'Failed to add like' },
          { status: 500 }
        );
      }
    }

    // Get updated like count
    const { data: likeCount, error: countError } = await supabase
      .from('blog_interactions')
      .select('id', { count: 'exact' })
      .eq('post_id', postId)
      .eq('interaction_type', 'like');

    if (countError) {
      console.error('Error getting like count:', countError);
      return NextResponse.json(
        { error: 'Failed to get like count' },
        { status: 500 }
      );
    }

    // Update the blog_posts table
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ like_count: likeCount?.length || 0 })
      .eq('id', postId);

    if (updateError) {
      console.error('Error updating like count:', updateError);
    }

    return NextResponse.json({
      success: true,
      action,
      likeCount: likeCount?.length || 0,
      hasLiked: action === 'added'
    });

  } catch (error) {
    console.error('Error in like API:', error);
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
    const userIdentifier = searchParams.get('userIdentifier');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get like count
    const { data: likeCount, error: countError } = await supabase
      .from('blog_interactions')
      .select('id', { count: 'exact' })
      .eq('post_id', postId)
      .eq('interaction_type', 'like');

    if (countError) {
      console.error('Error getting like count:', countError);
      return NextResponse.json(
        { error: 'Failed to get like count' },
        { status: 500 }
      );
    }

    let hasLiked = false;
    if (userIdentifier) {
      // Check if user has liked this post
      const { data: userLike, error: userError } = await supabase
        .from('blog_interactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_identifier', userIdentifier)
        .eq('interaction_type', 'like')
        .single();

      hasLiked = !userError && userLike;
    }

    return NextResponse.json({
      likeCount: likeCount?.length || 0,
      hasLiked
    });

  } catch (error) {
    console.error('Error in like GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
