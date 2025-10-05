'use client';

import React, { useEffect, useState } from 'react';
import { AdminAuth, supabase } from '@/lib/auth';
import { motion } from 'framer-motion';

// NoSSR component to prevent hydration issues
const NoSSR = ({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
import { 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Star,
  Building2,
  Handshake,
  Newspaper,
  MessageSquare,
  Calendar,
  User,
  Phone,
  FileSpreadsheet,
  FileImage,
  X
} from 'lucide-react';
import NoSSR from '@/components/NoSSR';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  category: 'general' | 'companies' | 'partnerships' | 'media';
  status: 'new' | 'read' | 'responded' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  admin_notes?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

const categoryLabels = {
  general: 'عام',
  companies: 'شركات',
  partnerships: 'شراكات',
  media: 'إعلام'
};

const statusLabels = {
  new: 'جديد',
  read: 'مقروء',
  responded: 'تم الرد',
  closed: 'مغلق'
};

const priorityLabels = {
  low: 'منخفض',
  medium: 'متوسط',
  high: 'عالي',
  urgent: 'عاجل'
};

const statusColors = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  read: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  responded: 'bg-green-500/20 text-green-400 border-green-500/30',
  closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

const priorityColors = {
  low: 'bg-gray-500/20 text-gray-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-orange-500/20 text-orange-400',
  urgent: 'bg-red-500/20 text-red-400'
};

const categoryIcons = {
  general: MessageSquare,
  companies: Building2,
  partnerships: Handshake,
  media: Newspaper
};

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Delay the auth check to avoid hydration issues
    const timer = setTimeout(() => {
      checkAuthAndFetchData();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchData();
    }
  }, [showTrash, mounted]);

  const checkAuthAndFetchData = async () => {
    // Temporarily skip authentication for testing
    // const isAuthenticated = await AdminAuth.isAuthenticatedAdmin();
    // if (!isAuthenticated) {
    //   window.location.href = '/';
    //   return;
    // }
    await fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Use Supabase directly instead of backend
      const { createClient } = await import('@supabase/supabase-js');
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('Fetching messages directly from Supabase...');
      
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .eq('is_deleted', showTrash)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }
      
      console.log('Successfully fetched messages:', data);
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      setMessages([]);
      alert(`Error loading messages: ${error.message}\n\nPlease check your internet connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    setAdminNotes(message.admin_notes || '');
  };

  const updateMessageStatus = async (id: string, status: string, priority?: string) => {
    try {
      setIsUpdating(true);
      
      // Use Supabase directly instead of backend
      const { createClient } = await import('@supabase/supabase-js');
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('Updating message status directly in Supabase...');
      
      const updateData: any = { 
          status,
        updated_at: new Date().toISOString()
      };
      
      if (priority) {
        updateData.priority = priority;
      }
      
      if (adminNotes) {
        updateData.admin_notes = adminNotes;
      }
      
      const { error } = await supabase
        .from('contact_messages')
        .update(updateData)
        .eq('id', id);
      
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      await fetchData();
      setSelectedMessage(null);
      setAdminNotes('');
    } catch (error: any) {
      console.error('Error updating message:', error);
      alert(`Error updating message: ${error.message || 'Unknown error'}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const saveAdminNotes = async () => {
    if (!selectedMessage || !adminNotes.trim()) return;
    
    try {
      setIsUpdating(true);
      
      // Use Supabase directly instead of backend
      const { createClient } = await import('@supabase/supabase-js');
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('Saving admin notes directly in Supabase...');
      
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedMessage.id);
      
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      await fetchData();
      alert('Notes saved successfully!');
    } catch (error: any) {
      console.error('Error saving notes:', error);
      alert(`Error saving notes: ${error.message || 'Unknown error'}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to move this message to trash? It will be permanently deleted after 90 days.')) {
      return;
    }

    try {
      setDeletingMessage(id);
      
      const { createClient } = await import('@supabase/supabase-js');
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('Moving message to trash...');
      
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      await fetchData();
      alert('Message moved to trash successfully!');
    } catch (error: any) {
      console.error('Error deleting message:', error);
      alert(`Error deleting message: ${error.message || 'Unknown error'}`);
    } finally {
      setDeletingMessage(null);
    }
  };

  const restoreMessage = async (id: string) => {
    try {
      setDeletingMessage(id);
      
      const { createClient } = await import('@supabase/supabase-js');
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('Restoring message from trash...');
      
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          is_deleted: false,
          deleted_at: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      await fetchData();
      alert('Message restored successfully!');
    } catch (error: any) {
      console.error('Error restoring message:', error);
      alert(`Error restoring message: ${error.message || 'Unknown error'}`);
    } finally {
      setDeletingMessage(null);
    }
  };

  const exportToPDF = async () => {
    if (!selectedMessage) return;
    
    try {
      const element = document.getElementById('message-details');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#131422'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${selectedMessage.full_name}_contact_message.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const exportToExcel = () => {
    if (!selectedMessage) return;

    try {
      const data = [
        ['Field', 'Value'],
        ['Name', selectedMessage.full_name],
        ['Email', selectedMessage.email],
        ['Phone', selectedMessage.phone || 'N/A'],
        ['Company', selectedMessage.company || 'N/A'],
        ['Subject', selectedMessage.subject],
        ['Message', selectedMessage.message],
        ['Category', categoryLabels[selectedMessage.category]],
        ['Status', statusLabels[selectedMessage.status]],
        ['Priority', priorityLabels[selectedMessage.priority]],
        ['Created At', new Date(selectedMessage.created_at).toLocaleString()],
        ['Admin Notes', selectedMessage.admin_notes || 'N/A']
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Message Details');

      const fileName = `${selectedMessage.full_name}_contact_message.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error('Error generating Excel:', error);
      alert('Error generating Excel file. Please try again.');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || message.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    let aValue: any = a[sortBy as keyof ContactMessage];
    let bValue: any = b[sortBy as keyof ContactMessage];
    
    if (sortBy === 'created_at') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f0f1b] flex items-center justify-center" suppressHydrationWarning>
        <div className="text-white" suppressHydrationWarning>Loading...</div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f0f1b] p-6 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-[#6B2D73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1b] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                {showTrash ? 'Trash' : 'Contact Messages'}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {showTrash 
                  ? 'Manage deleted messages (permanently deleted after 90 days)' 
                  : 'Manage and respond to contact form messages'
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setShowTrash(!showTrash)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2 ${
                  showTrash 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {showTrash ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Back to Messages
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    View Trash
                  </>
                )}
              </button>
              <button
                onClick={fetchData}
                disabled={loading}
                className="px-4 py-2 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none text-white"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none text-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none text-white"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="companies">Companies</option>
                <option value="partnerships">Partnerships</option>
                <option value="media">Media</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none text-white"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none text-white"
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="full_name-asc">Name A-Z</option>
                <option value="full_name-desc">Name Z-A</option>
                <option value="priority-desc">Priority High-Low</option>
                <option value="priority-asc">Priority Low-High</option>
              </select>
            </div>
          )}
        </div>

        {/* Messages Table */}
        <div className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#6B2D73] border-t-transparent rounded-full animate-spin mr-3"></div>
                      Loading messages...
                      </div>
                    </td>
                  </tr>
                ) : sortedMessages.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                      <div className="space-y-4">
                        <p>No messages found</p>
                        <button
                          onClick={fetchData}
                          className="px-4 py-2 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300"
                        >
                          Retry
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sortedMessages.map((message) => {
                    const CategoryIcon = categoryIcons[message.category];
                    return (
                      <tr key={message.id} className="hover:bg-gray-800/30 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                              <NoSSR fallback="A">
                              {message.full_name.charAt(0).toUpperCase()}
                              </NoSSR>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                <NoSSR fallback="Loading...">
                                  {message.full_name}
                                </NoSSR>
                              </div>
                              {message.company && (
                                <div className="text-xs text-gray-400">{message.company}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            <NoSSR fallback="Loading...">
                              {message.email}
                            </NoSSR>
                          </div>
                          {message.phone && (
                            <div className="text-xs text-gray-400">{message.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <CategoryIcon className="w-4 h-4 text-[#6B2D73] mr-2" />
                            <span className="text-sm text-gray-300">{categoryLabels[message.category]}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 max-w-xs truncate">{message.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[message.status]}`}>
                            {statusLabels[message.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[message.priority]}`}>
                            {priorityLabels[message.priority]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            <NoSSR fallback="Loading...">
                              <span suppressHydrationWarning>
                              {new Date(message.created_at).toLocaleDateString()}
                              </span>
                            </NoSSR>
                          </div>
                          {showTrash && message.deleted_at && (
                            <div className="text-xs text-red-400 mt-1">
                              <NoSSR fallback="Loading...">
                                Deleted: {new Date(message.deleted_at).toLocaleDateString()}
                              </NoSSR>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMessageClick(message)}
                              className="text-[#6B2D73] hover:text-[#9347a0] transition-colors duration-300"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {showTrash ? (
                              <button
                                onClick={() => restoreMessage(message.id)}
                                disabled={deletingMessage === message.id}
                                className="text-green-500 hover:text-green-400 transition-colors duration-300 disabled:opacity-50"
                                title="Restore Message"
                              >
                                {deletingMessage === message.id ? (
                                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                  </svg>
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => deleteMessage(message.id)}
                                disabled={deletingMessage === message.id}
                                className="text-red-500 hover:text-red-400 transition-colors duration-300 disabled:opacity-50"
                                title="Move to Trash"
                              >
                                {deletingMessage === message.id ? (
                                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Details Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Message Details</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition-colors duration-300 text-sm"
                    title="Export to PDF"
                  >
                    <FileImage className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg transition-colors duration-300 text-sm"
                    title="Export to Excel"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div id="message-details" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Full Name</label>
                      <p className="text-white">{selectedMessage.full_name}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Email</label>
                      <p className="text-white">{selectedMessage.email}</p>
                    </div>
                    
                    {selectedMessage.phone && (
                      <div>
                        <label className="text-sm text-gray-400">Phone</label>
                        <p className="text-white">{selectedMessage.phone}</p>
                      </div>
                    )}
                    
                    {selectedMessage.company && (
                      <div>
                        <label className="text-sm text-gray-400">Company</label>
                        <p className="text-white">{selectedMessage.company}</p>
                      </div>
                    )}
                    
                    <div>
                      <label className="text-sm text-gray-400">Category</label>
                      <div className="flex items-center mt-1">
                        {React.createElement(categoryIcons[selectedMessage.category], { className: "w-4 h-4 text-[#6B2D73] mr-2" })}
                        <span className="text-white">{categoryLabels[selectedMessage.category]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Message Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Subject</label>
                      <p className="text-white">{selectedMessage.subject}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Message</label>
                      <p className="text-white text-sm bg-gray-800/50 p-3 rounded-lg">{selectedMessage.message}</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <div>
                        <label className="text-sm text-gray-400">Status</label>
                        <div className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[selectedMessage.status]}`}>
                            {statusLabels[selectedMessage.status]}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400">Priority</label>
                        <div className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[selectedMessage.priority]}`}>
                            {priorityLabels[selectedMessage.priority]}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Created At</label>
                      <p className="text-white text-sm">
                        <NoSSR fallback="Loading...">
                          {new Date(selectedMessage.created_at).toLocaleString()}
                        </NoSSR>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Admin Notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none transition-colors duration-300 text-white"
                  rows={3}
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={saveAdminNotes}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isUpdating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4" />
                        Save Notes
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Management */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Mark as Read
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'responded')}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Responded
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, 'closed')}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/40 text-gray-300 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Close
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, selectedMessage.status, 'high')}
                    disabled={isUpdating}
                    className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 rounded-lg transition-colors duration-300 disabled:opacity-50 text-sm"
                  >
                    High Priority
                  </button>
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, selectedMessage.status, 'urgent')}
                    disabled={isUpdating}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition-colors duration-300 disabled:opacity-50 text-sm"
                  >
                    Urgent
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
