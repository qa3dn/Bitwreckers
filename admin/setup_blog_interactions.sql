-- Setup Blog Interactions System
-- Run this in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_interactions table
CREATE TABLE IF NOT EXISTS public.blog_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    user_identifier TEXT NOT NULL,
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('like', 'view')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one like/view per user per post
    UNIQUE(post_id, user_identifier, interaction_type)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_interactions_post_id ON public.blog_interactions(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_interactions_type ON public.blog_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_blog_interactions_user_identifier ON public.blog_interactions(user_identifier);

-- Set RLS
ALTER TABLE public.blog_interactions ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access to blog interactions" ON public.blog_interactions;
CREATE POLICY "Allow public read access to blog interactions"
ON public.blog_interactions FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow public insert access to blog interactions" ON public.blog_interactions;
CREATE POLICY "Allow public insert access to blog interactions"
ON public.blog_interactions FOR INSERT
WITH CHECK (true);

-- Function to get like count for a post
CREATE OR REPLACE FUNCTION public.get_post_like_count(post_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM public.blog_interactions
        WHERE post_id = post_uuid AND interaction_type = 'like'
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get view count for a post
CREATE OR REPLACE FUNCTION public.get_post_view_count(post_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM public.blog_interactions
        WHERE post_id = post_uuid AND interaction_type = 'view'
    );
END;
$$ LANGUAGE plpgsql;

-- Function to check if user has liked a post
CREATE OR REPLACE FUNCTION public.user_has_liked(post_uuid UUID, user_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.blog_interactions
        WHERE post_id = post_uuid 
        AND user_identifier = user_id 
        AND interaction_type = 'like'
    );
END;
$$ LANGUAGE plpgsql;

-- Update existing blog_posts to sync with interactions
UPDATE public.blog_posts 
SET like_count = COALESCE((
    SELECT COUNT(*) 
    FROM public.blog_interactions 
    WHERE post_id = blog_posts.id AND interaction_type = 'like'
), 0),
view_count = COALESCE((
    SELECT COUNT(*) 
    FROM public.blog_interactions 
    WHERE post_id = blog_posts.id AND interaction_type = 'view'
), 0);

-- Success message
SELECT 'Blog interactions system setup completed successfully!' as message;
