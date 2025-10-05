-- Fix Announcements category color
-- The current color #F8F8F8 is too light and makes white text invisible

UPDATE public.blog_categories 
SET color = '#FF6B35' 
WHERE slug = 'announcements' AND name_en = 'Announcements';

-- Alternative colors you can use:
-- '#FF6B35' - Orange (current choice)
-- '#E74C3C' - Red
-- '#F39C12' - Orange/Yellow
-- '#9B59B6' - Purple
-- '#34495E' - Dark Blue/Gray
-- '#2ECC71' - Green
