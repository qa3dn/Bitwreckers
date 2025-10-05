'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Heart, Share2, ArrowRight, Search, Filter } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';
import LikeButton from '../../components/LikeButton';
import ShareButton from '../../components/ShareButton';

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
  category_en: string;
  category_ar: string;
  tags_en: string[];
  tags_ar: string[];
  author_name: string;
  author_avatar_url?: string;
  published_at: string;
  view_count: number;
  like_count: number;
  is_featured: boolean;
}

interface BlogCategory {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  color: string;
}

export default function BlogPage() {
  const { t, isRTL } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setMounted(true);
    // Generate user identifier
    const generateUserIdentifier = () => {
      const userAgent = navigator.userAgent;
      const timestamp = Date.now().toString();
      return btoa(userAgent + timestamp).substring(0, 16);
    };
    setUserIdentifier(generateUserIdentifier());
    
    fetchPosts();
    fetchCategories();
  }, []);

  // Update view counts when posts are loaded
  useEffect(() => {
    if (posts.length > 0) {
      // Update view counts for all posts
      const updateViewCounts = async () => {
        const updatedPosts = await Promise.all(
          posts.map(async (post) => {
            try {
              const response = await fetch(`/api/blog/view?postId=${post.id}`);
              if (response.ok) {
                const result = await response.json();
                return { ...post, view_count: result.viewCount };
              }
            } catch (error) {
              console.error('Error updating view count:', error);
            }
            return post;
          })
        );
        setPosts(updatedPosts);
      };
      
      updateViewCounts();
    }
  }, [posts.length]);

  const fetchPosts = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }
      
      setPosts(data || []);
      setFeaturedPost(data?.find(post => post.is_featured) || data?.[0] || null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('is_active', true)
        .order('name_en');
      
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }
      
      setCategories(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = isRTL 
      ? post.title_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt_ar?.toLowerCase().includes(searchTerm.toLowerCase())
      : post.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt_en?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      (isRTL ? post.category_ar === selectedCategory : post.category_en === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isRTL 
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-[#131422] to-gray-900 ${isRTL ? 'font-arabic' : 'font-english'}`} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <div className="container mx-auto px-4 pt-24 pb-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isRTL ? 'مدونة بيتريكرز' : 'Bitwreckers Blog'}
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#F8F8F8] max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isRTL 
              ? 'اكتشف آخر الأخبار التقنية والمقالات التعليمية والتحديثات من عالم بيتريكرز'
              : 'Discover the latest tech news, educational articles, and updates from the Bitwreckers world'
            }
          </motion.p>
          
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={isRTL ? 'ابحث في المقالات...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors text-sm sm:text-base"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-9 sm:pl-10 pr-8 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#6B2D73] transition-colors appearance-none w-full sm:min-w-[200px] text-sm sm:text-base"
              >
                <option value="all">{isRTL ? 'جميع الفئات' : 'All Categories'}</option>
                {categories.map((category) => (
                  <option key={category.id} value={isRTL ? category.name_ar : category.name_en}>
                    {isRTL ? category.name_ar : category.name_en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-gradient-to-r from-[#6B2D73]/20 to-[#9347a0]/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-[#6B2D73]/30 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#6B2D73] text-white text-xs sm:text-sm font-semibold rounded-full">
                  {isRTL ? 'مقال مميز' : 'Featured'}
                </span>
                <span 
                  className="px-3 py-1 text-white text-xs sm:text-sm font-semibold rounded-full"
                  style={{ backgroundColor: categories.find(c => c.name_en === featuredPost.category_en)?.color || '#6B2D73' }}
                >
                  {isRTL ? featuredPost.category_ar : featuredPost.category_en}
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                {isRTL ? featuredPost.title_ar : featuredPost.title_en}
              </h2>
              
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                {isRTL ? featuredPost.excerpt_ar : featuredPost.excerpt_en}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featuredPost.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{featuredPost.view_count}</span>
                  </div>
                </div>
                
                <Link href={`/blog/${featuredPost.slug}`}>
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] text-white rounded-xl font-semibold hover:from-[#5a2560] hover:to-[#7b3985] transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isRTL ? 'اقرأ المزيد' : 'Read More'}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm hover:border-[#6B2D73]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {post.featured_image_url && (
                <div className="aspect-video bg-gray-700 overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={isRTL ? post.featured_image_alt_ar : post.featured_image_alt_en}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="px-2 py-1 text-white text-xs font-semibold rounded-full"
                    style={{ backgroundColor: categories.find(c => c.name_en === post.category_en)?.color || '#6B2D73' }}
                  >
                    {isRTL ? post.category_ar : post.category_en}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
                  {isRTL ? post.title_ar : post.title_en}
                </h3>
                
                <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
                  {isRTL ? post.excerpt_ar : post.excerpt_en}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-400 text-xs sm:text-sm mb-4 gap-2 sm:gap-0">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="truncate">{post.author_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="truncate">{formatDate(post.published_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.view_count}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link href={`/blog/${post.slug}`}>
                    <motion.button
                      className="text-[#6B2D73] hover:text-[#9347a0] font-semibold transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {isRTL ? 'اقرأ المزيد' : 'Read More'} →
                    </motion.button>
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    {userIdentifier && (
                      <LikeButton 
                        postId={post.id}
                        initialLikeCount={post.like_count}
                        userIdentifier={userIdentifier}
                      />
                    )}
                    <ShareButton 
                      post={post}
                      isRTL={isRTL}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && !loading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 text-lg">
              {isRTL ? 'لا توجد مقالات مطابقة لبحثك' : 'No articles match your search'}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
