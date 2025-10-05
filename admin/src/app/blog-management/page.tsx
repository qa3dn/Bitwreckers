'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag,
  Search,
  Filter,
  MoreVertical,
  Image as ImageIcon,
  Globe,
  FileText
} from 'lucide-react';

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
  author_email?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  published_at?: string;
  view_count: number;
  like_count: number;
  share_count: number;
  created_at: string;
  updated_at: string;
}

interface BlogCategory {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  color: string;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }
      
      setPosts(data || []);
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
    const matchesSearch = post.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.title_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category_en === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeletePost = async (postId: string) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
        return;
      }
      
      setPosts(posts.filter(post => post.id !== postId));
      setShowDeleteModal(null);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting post');
    }
  };

  const handleStatusChange = async (postId: string, newStatus: string) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const updateData: any = { status: newStatus };
      if (newStatus === 'published' && !posts.find(p => p.id === postId)?.published_at) {
        updateData.published_at = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId);
      
      if (error) {
        console.error('Error updating post status:', error);
        alert('Error updating post status');
        return;
      }
      
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, status: newStatus as any, ...updateData }
          : post
      ));
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating post status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#131422] flex items-center justify-center" suppressHydrationWarning>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B2D73] mx-auto mb-4"></div>
          <p className="text-white">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131422] p-4 sm:p-6" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">Blog Management</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage your blog posts and content</p>
          </div>
          
          <button
            onClick={() => {
              // Clear any existing editing post data and open editor
              localStorage.removeItem('editingPost');
              window.open('/blog-editor', '_blank');
            }}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6B2D73] transition-colors"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#6B2D73] transition-colors appearance-none"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#6B2D73] transition-colors appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name_en}>
                    {category.name_en}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-gray-400">
              <span>{filteredPosts.length} posts</span>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Post</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Author</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Views</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Created</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={post.title_en}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="text-white font-semibold line-clamp-1">
                            {post.title_en}
                          </div>
                          <div className="text-gray-400 text-sm line-clamp-1">
                            {post.title_ar}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{post.author_name}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span 
                        className="px-2 py-1 text-white text-xs font-semibold rounded-full"
                        style={{ backgroundColor: categories.find(c => c.name_en === post.category_en)?.color || '#6B2D73' }}
                      >
                        {post.category_en}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <select
                        value={post.status}
                        onChange={(e) => handleStatusChange(post.id, e.target.value)}
                        className={`px-2 py-1 text-white text-xs font-semibold rounded-full border-0 ${getStatusColor(post.status)}`}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-300">
                        <Eye className="w-4 h-4" />
                        <span>{post.view_count}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(post.created_at)}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                          title="View Post"
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => {
                            // Store the post data in localStorage and navigate to editor
                            localStorage.setItem('editingPost', JSON.stringify(post));
                            window.open('/blog-editor', '_blank');
                          }}
                          className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => setShowDeleteModal(post.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Posts Found</h3>
            <p className="text-gray-400 mb-6">Start by creating your first blog post.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300"
            >
              Create First Post
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Delete Post</h3>
              <p className="text-gray-300 mb-2">
                Are you sure you want to delete this post?
              </p>
              <p className="text-gray-400 text-sm mb-6">
                <strong>Post:</strong> {posts.find(p => p.id === showDeleteModal)?.title_en || 'Unknown'}
              </p>
              <p className="text-red-400 text-sm mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePost(showDeleteModal)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
