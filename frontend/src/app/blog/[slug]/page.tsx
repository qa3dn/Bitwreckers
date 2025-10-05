'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Heart, Share2, ArrowLeft, Clock, Tag } from 'lucide-react';
import useTranslation from '../../../hooks/useTranslation';
import LikeButton from '../../../components/LikeButton';

interface BlogPost {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  content_en: string;
  content_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  featured_image_url?: string;
  featured_image_alt_en?: string;
  featured_image_alt_ar?: string;
  category_en: string;
  category_ar: string;
  tags_en: string[];
  tags_ar: string[];
  author_name: string;
  author_avatar_url?: string;
  published_at: string;
  view_count: number;
  like_count: number;
  meta_description_en?: string;
  meta_description_ar?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const { t, isRTL } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [userIdentifier, setUserIdentifier] = useState('');

  useEffect(() => {
    setMounted(true);
    // Generate user identifier
    const generateUserIdentifier = () => {
      const userAgent = navigator.userAgent;
      const timestamp = Date.now().toString();
      return btoa(userAgent + timestamp).substring(0, 16);
    };
    setUserIdentifier(generateUserIdentifier());
    
    if (params.slug) {
      fetchPost(params.slug as string);
    }
  }, [params.slug]);

  const fetchPost = async (slug: string) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) {
        console.error('Error fetching post:', error);
        return;
      }
      
      setPost(data);
      
      // Record view
      if (userIdentifier) {
        try {
          const viewResponse = await fetch('/api/blog/view', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              postId: data.id,
              userIdentifier: userIdentifier
            }),
          });
          
          if (viewResponse.ok) {
            const viewResult = await viewResponse.json();
            // Update the post with new view count
            setPost(prev => prev ? { ...prev, view_count: viewResult.viewCount } : null);
          }
        } catch (error) {
          console.error('Error recording view:', error);
        }
      }

        
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isRTL 
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };


  const handleShare = async (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const title = isRTL ? post.title_ar : post.title_en;
    const text = isRTL ? post.excerpt_ar : post.excerpt_en;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      
      // Increment share count
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        await supabase
          .from('blog_posts')
          .update({ share_count: post.share_count + 1 })
          .eq('id', post.id);
          
        setShareCount(prev => prev + 1);
      } catch (error) {
        console.error('Error updating share count:', error);
      }
    }
  };

  const copyToClipboard = async () => {
    if (!post) return;
    
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#131422] to-gray-900 flex items-center justify-center" suppressHydrationWarning>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B2D73] mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#131422] to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {isRTL ? 'المقال غير موجود' : 'Post Not Found'}
          </h1>
          <Link href="/blog">
            <button className="px-6 py-3 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300">
              {isRTL ? 'العودة للمدونة' : 'Back to Blog'}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-[#131422] to-gray-900 ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-20">
        {/* Back Button */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/blog">
            <motion.button
              className="flex items-center gap-2 text-[#6B2D73] hover:text-[#9347a0] transition-colors duration-300 text-sm sm:text-base"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              {isRTL ? 'العودة للمدونة' : 'Back to Blog'}
            </motion.button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="px-3 py-1 bg-[#6B2D73] text-white text-xs sm:text-sm font-semibold rounded-full">
              {isRTL ? post.category_ar : post.category_en}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {isRTL ? post.title_ar : post.title_en}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            {isRTL ? post.excerpt_ar : post.excerpt_en}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{post.view_count} {isRTL ? 'مشاهدة' : 'views'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{isRTL ? '5 دقائق قراءة' : '5 min read'}</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.featured_image_url && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-video bg-gray-700 rounded-2xl overflow-hidden">
              <img
                src={post.featured_image_url}
                alt={isRTL ? post.featured_image_alt_ar : post.featured_image_alt_en}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          className="prose prose-lg prose-invert max-w-none mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div 
            className="text-gray-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ 
              __html: isRTL ? post.content_ar : post.content_en 
            }}
          />
        </motion.article>

        {/* Tags */}
        {post.tags_en.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-[#6B2D73]" />
              <span className="text-white font-semibold">
                {isRTL ? 'العلامات:' : 'Tags:'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(isRTL ? post.tags_ar : post.tags_en).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Social Actions */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Like Button */}
          {userIdentifier && (
            <LikeButton 
              postId={post.id}
              initialLikeCount={post.like_count}
              userIdentifier={userIdentifier}
              className="px-6 py-3 rounded-xl font-semibold"
            />
          )}

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="text-gray-400 font-semibold text-sm sm:text-base">
              {isRTL ? 'شارك المقال:' : 'Share Article:'}
            </span>
            
            <div className="flex flex-wrap gap-2">
              <motion.button
                onClick={() => handleShare('twitter')}
                className="p-2.5 sm:p-3 bg-gray-700/50 hover:bg-blue-500 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Share on Twitter"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.button>
              
              <motion.button
                onClick={() => handleShare('facebook')}
                className="p-2.5 sm:p-3 bg-gray-700/50 hover:bg-blue-600 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Share on Facebook"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.button>
              
              <motion.button
                onClick={() => handleShare('linkedin')}
                className="p-2.5 sm:p-3 bg-gray-700/50 hover:bg-blue-700 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Share on LinkedIn"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.button>
              
              <motion.button
                onClick={() => handleShare('telegram')}
                className="p-2.5 sm:p-3 bg-gray-700/50 hover:bg-blue-500 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Share on Telegram"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </motion.button>
              
              <motion.button
                onClick={() => handleShare('whatsapp')}
                className="p-2.5 sm:p-3 bg-gray-700/50 hover:bg-green-500 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Share on WhatsApp"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </motion.button>
              
              <motion.button
                onClick={copyToClipboard}
                className="p-2.5 sm:p-3 bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Copy Link"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
