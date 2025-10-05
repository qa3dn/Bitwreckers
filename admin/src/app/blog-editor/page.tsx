'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon,
  Bold,
  Italic,
  Link,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  X
} from 'lucide-react';

interface BlogPost {
  id?: string;
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
  author_email?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  meta_description_en?: string;
  meta_description_ar?: string;
  meta_keywords_en?: string;
  meta_keywords_ar?: string;
}

interface BlogCategory {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  color: string;
}

export default function BlogEditorPage() {
  const [mounted, setMounted] = useState(false);
  const [post, setPost] = useState<BlogPost>({
    title_en: '',
    title_ar: '',
    slug: '',
    content_en: '',
    content_ar: '',
    excerpt_en: '',
    excerpt_ar: '',
    category_en: '',
    category_ar: '',
    tags_en: [],
    tags_ar: [],
    author_name: 'Bitwreckers Team',
    author_email: 'team@bitwreckers.com',
    status: 'draft',
    is_featured: false,
    meta_description_en: '',
    meta_description_ar: '',
    meta_keywords_en: '',
    meta_keywords_ar: ''
  });

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en');
  const [showPreview, setShowPreview] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    fetchCategories();
    loadEditingPost();
  }, []);

  const loadEditingPost = () => {
    try {
      const editingPostData = localStorage.getItem('editingPost');
      if (editingPostData) {
        const postData = JSON.parse(editingPostData);
        setPost(postData);
        // Clear the localStorage after loading
        localStorage.removeItem('editingPost');
      }
    } catch (error) {
      console.error('Error loading editing post:', error);
    }
  };

  useEffect(() => {
    // Auto-generate slug from English title
    if (post.title_en) {
      const slug = post.title_en
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setPost(prev => ({ ...prev, slug }));
    }
  }, [post.title_en]);

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

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    setImageUploading(true);
    try {
      // In a real implementation, you would upload to a cloud storage service
      // For now, we'll create a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPost(prev => ({ 
          ...prev, 
          featured_image_url: e.target?.result as string 
        }));
        setImageUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageUploading(false);
    }
  };

  const insertMarkdown = (markdown: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText = markdown.replace('{text}', selectedText);
    
    const newContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    setPost(prev => ({ 
      ...prev, 
      [`content_${activeTab}`]: newContent 
    }));
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    if (!post.title_en || !post.title_ar || !post.content_en || !post.content_ar) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const postData = {
        ...post,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null
      };

      if (post.id) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id);
        
        if (error) throw error;
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        
        if (error) throw error;
      }
      
      alert(`Post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      window.location.href = '/blog-management';
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setSaving(false);
    }
  };

  const handleCategoryChange = (categoryName: string) => {
    const category = categories.find(c => c.name_en === categoryName);
    setPost(prev => ({
      ...prev,
      category_en: categoryName,
      category_ar: category?.name_ar || ''
    }));
  };

  const handleTagsChange = (tagsString: string, language: 'en' | 'ar') => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setPost(prev => ({
      ...prev,
      [`tags_${language}`]: tags
    }));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#131422] flex items-center justify-center" suppressHydrationWarning>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B2D73] mx-auto mb-4"></div>
          <p className="text-white">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131422] p-4 sm:p-6" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => window.location.href = '/blog-management'}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {post.id ? 'Edit Blog Post' : 'Blog Editor'}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {post.id ? 'Edit existing blog post' : 'Create and edit blog posts'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : (post.id ? 'Update Draft' : 'Save Draft')}
            </button>
            
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Publishing...' : (post.id ? 'Update & Publish' : 'Publish')}
            </button>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('en')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'en' 
                ? 'bg-[#6B2D73] text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveTab('ar')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'ar' 
                ? 'bg-[#6B2D73] text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            العربية
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Title ({activeTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <input
                    type="text"
                    value={post[`title_${activeTab}` as keyof BlogPost] as string || ''}
                    onChange={(e) => setPost(prev => ({ 
                      ...prev, 
                      [`title_${activeTab}`]: e.target.value 
                    }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
                    placeholder={`Enter title in ${activeTab === 'en' ? 'English' : 'Arabic'}...`}
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-white font-semibold mb-2">Slug</label>
                  <input
                    type="text"
                    value={post.slug || ''}
                    onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
                    placeholder="post-url-slug"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Excerpt ({activeTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    ref={excerptRef}
                    value={post[`excerpt_${activeTab}` as keyof BlogPost] as string || ''}
                    onChange={(e) => setPost(prev => ({ 
                      ...prev, 
                      [`excerpt_${activeTab}`]: e.target.value 
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors resize-none"
                    placeholder={`Enter excerpt in ${activeTab === 'en' ? 'English' : 'Arabic'}...`}
                  />
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  Content ({activeTab === 'en' ? 'English' : 'Arabic'})
                </h3>
                
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => insertMarkdown('**{text}**')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('*{text}*')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('[Link Text](url)')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('# {text}')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Heading 1"
                  >
                    <Heading1 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('## {text}')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Heading 2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('```\n{text}\n```')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Code Block"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <textarea
                ref={contentRef}
                value={post[`content_${activeTab}` as keyof BlogPost] as string || ''}
                onChange={(e) => setPost(prev => ({ 
                  ...prev, 
                  [`content_${activeTab}`]: e.target.value 
                }))}
                rows={20}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors resize-none font-mono text-sm"
                placeholder={`Write your content in ${activeTab === 'en' ? 'English' : 'Arabic'} using Markdown...`}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Featured Image</h3>
              
              {post.featured_image_url ? (
                <div className="relative">
                  <img
                    src={post.featured_image_url}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setPost(prev => ({ ...prev, featured_image_url: undefined }))}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Upload featured image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    {imageUploading ? 'Uploading...' : 'Choose Image'}
                  </label>
                </div>
              )}
            </div>

            {/* Category & Tags */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Category & Tags</h3>
              
              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-white font-semibold mb-2">Category</label>
                  <select
                    value={post.category_en || ''}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#6B2D73] transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name_en}>
                        {category.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-white font-semibold mb-2">Tags (English)</label>
                  <input
                    type="text"
                    value={post.tags_en?.join(', ') || ''}
                    onChange={(e) => handleTagsChange(e.target.value, 'en')}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Tags (Arabic)</label>
                  <input
                    type="text"
                    value={post.tags_ar?.join(', ') || ''}
                    onChange={(e) => handleTagsChange(e.target.value, 'ar')}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
                    placeholder="علامة1, علامة2, علامة3"
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Meta Description ({activeTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    value={post[`meta_description_${activeTab}` as keyof BlogPost] as string || ''}
                    onChange={(e) => setPost(prev => ({ 
                      ...prev, 
                      [`meta_description_${activeTab}`]: e.target.value 
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors resize-none"
                    placeholder={`Meta description in ${activeTab === 'en' ? 'English' : 'Arabic'}...`}
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Meta Keywords ({activeTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <input
                    type="text"
                    value={post[`meta_keywords_${activeTab}` as keyof BlogPost] as string || ''}
                    onChange={(e) => setPost(prev => ({ 
                      ...prev, 
                      [`meta_keywords_${activeTab}`]: e.target.value 
                    }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
                    placeholder={`Keywords in ${activeTab === 'en' ? 'English' : 'Arabic'}...`}
                  />
                </div>
              </div>
            </div>

            {/* Post Settings */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Post Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white font-semibold">Featured Post</label>
                  <input
                    type="checkbox"
                    checked={post.is_featured}
                    onChange={(e) => setPost(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="w-4 h-4 text-[#6B2D73] bg-gray-700 border-gray-600 rounded focus:ring-[#6B2D73]"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Author Name</label>
                  <input
                    type="text"
                    value={post.author_name || ''}
                    onChange={(e) => setPost(prev => ({ ...prev, author_name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Author Email</label>
                  <input
                    type="email"
                    value={post.author_email || ''}
                    onChange={(e) => setPost(prev => ({ ...prev, author_email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
