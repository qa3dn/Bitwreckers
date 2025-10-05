'use client';

import { useEffect, useState } from 'react';
import { AdminAuth, supabase } from '@/lib/auth';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  LogOut,
  Filter,
  Search,
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  Plus,
  Briefcase,
  Code,
  Palette,
  Lightbulb,
  Target,
  UserCheck,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  UserPlus,
  MessageCircle,
  Settings,
  BarChart3,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';
import NoSSR from '@/components/NoSSR';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

interface JoinRequest {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  age?: string;
  country?: string;
  university?: string;
  field_of_interest?: string;
  other_field?: string;
  experience_level?: string;
  skills?: string;
  portfolio?: string;
  motivation?: string;
  inspiration?: string;
  expectations?: string;
  contribution?: string;
  teamwork?: string;
  hours_per_week?: string;
  activities?: string[];
  previous_experience?: string;
  future_vision?: string;
  project_idea?: string;
  agreement: boolean;
  status: 'responded' | 'under_study' | 'rejected';
  notes?: string;
  admin_notes?: string;
  responded_at?: string;
  created_at: string;
  updated_at?: string;
}

interface ConsultationRequest {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  consultation_type?: string;
  other_type?: string;
  project_description?: string;
  consultation_format?: string;
  duration?: string;
  preferred_time?: string;
  preferred_date?: string;
  documents?: string;
  additional_notes?: string;
  status: 'responded' | 'under_study' | 'rejected';
  notes?: string;
  admin_notes?: string;
  responded_at?: string;
  created_at: string;
  updated_at?: string;
}

type RequestType = 'all' | 'join' | 'consultation';
type SortField = 'created_at' | 'full_name' | 'email' | 'status';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'all' | 'responded' | 'under_study' | 'rejected';

// Contact Messages Stats Component
const ContactMessagesStats = () => {
  const [contactStats, setContactStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    responded: 0,
    thisWeek: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactStats();
  }, []);

  const fetchContactStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all contact messages (including deleted for stats)
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const stats = {
        total: data?.length || 0,
        new: data?.filter(msg => msg.status === 'new' && !msg.is_deleted).length || 0,
        read: data?.filter(msg => msg.status === 'read' && !msg.is_deleted).length || 0,
        responded: data?.filter(msg => msg.status === 'responded' && !msg.is_deleted).length || 0,
        thisWeek: data?.filter(msg => new Date(msg.created_at) >= weekAgo && !msg.is_deleted).length || 0
      };

      setContactStats(stats);
    } catch (error) {
      console.error('Error fetching contact stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#6B2D73] border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-white">Loading contact messages stats...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Messages Management</h2>
        <p className="text-gray-400 mb-6">Manage and respond to contact form messages from the website.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Messages</p>
                <p className="text-2xl font-bold text-white">{contactStats.total}</p>
              </div>
              <Mail className="w-8 h-8 text-[#6B2D73]" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">New Messages</p>
                <p className="text-2xl font-bold text-blue-400">{contactStats.new}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Responded</p>
                <p className="text-2xl font-bold text-green-400">{contactStats.responded}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-purple-400">{contactStats.thisWeek}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Contact Messages</h3>
          <p className="text-gray-400 mb-6">View and manage contact form messages from your website visitors.</p>
          <button
            onClick={() => window.open('/contact-messages', '_blank')}
            className="px-6 py-3 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <Mail className="w-4 h-4" />
            Open Contact Messages
          </button>
        </div>
      </div>

      {/* Blog Management */}
      <div className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Blog Management</h2>
        <p className="text-gray-400 mb-6">Create, edit, and manage blog posts for your website.</p>
        
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Blog Posts</h3>
          <p className="text-gray-400 mb-6">Create engaging content and share your latest news and insights.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.open('/blog-management', '_blank')}
              className="px-6 py-3 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Manage Posts
            </button>
            <button
              onClick={() => {
                // Clear any existing editing post data
                localStorage.removeItem('editingPost');
                window.open('/blog-editor', '_blank');
              }}
              className="px-6 py-3 bg-[#2D7363] text-white rounded-lg hover:bg-[#5fa896] transition-colors duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
        </div>
      </div>

      {/* Team Members Management */}
      <div className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Team Members Management</h2>
        <p className="text-gray-400 mb-6">Manage your team members and their information displayed on the About Us page.</p>
        
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Team Members</h3>
          <p className="text-gray-400 mb-6">Add, edit, and manage team members that appear on your About Us page.</p>
          <button
            onClick={() => window.open('/team-members', '_blank')}
            className="px-6 py-3 bg-[#2D7363] text-white rounded-lg hover:bg-[#5fa896] transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            <Users className="w-4 h-4" />
            Manage Team Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'join' | 'consultation' | 'contact'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | ConsultationRequest | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [deletingRequest, setDeletingRequest] = useState<string | null>(null);

  // Using imported supabase client

  useEffect(() => {
    setMounted(true);
    checkAuthAndFetchData();
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchData();
    }
  }, [showTrash, mounted]);

  const checkAuthAndFetchData = async () => {
    const isAuthenticated = await AdminAuth.isAuthenticatedAdmin();
    if (!isAuthenticated) {
      window.location.href = '/';
      return;
    }
    await fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch join requests
      const { data: joinData, error: joinError } = await supabase
        .from('join_requests')
        .select('*')
        .eq('is_deleted', showTrash)
        .order('created_at', { ascending: false });

      if (joinError) throw joinError;

      // Fetch consultation requests
      const { data: consultationData, error: consultationError } = await supabase
        .from('consultation_requests')
        .select('*')
        .eq('is_deleted', showTrash)
        .order('created_at', { ascending: false });

      if (consultationError) throw consultationError;

      setJoinRequests(joinData || []);
      setConsultationRequests(consultationData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClick = (request: any) => {
    setSelectedRequest(request);
    setAdminNotes(request.admin_notes || '');
  };

  const isJoinRequest = (request: any): request is JoinRequest => {
    return 'university' in request;
  };

  const isConsultationRequest = (request: any): request is ConsultationRequest => {
    return 'organization' in request;
  };

  const exportToPDF = async () => {
    if (!selectedRequest) return;
    
    try {
      const element = document.getElementById('request-details');
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

      const requestType = isJoinRequest(selectedRequest) ? 'join' : 'consultation';
      const fileName = `${selectedRequest.full_name}_${requestType}_request.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const exportToExcel = () => {
    if (!selectedRequest) return;

    try {
      const data = [];
      
      if (isJoinRequest(selectedRequest)) {
        data.push(['Field', 'Value']);
        data.push(['Name', selectedRequest.full_name]);
        data.push(['Email', selectedRequest.email]);
        data.push(['Phone', selectedRequest.phone || 'N/A']);
        data.push(['Age', selectedRequest.age || 'N/A']);
        data.push(['Country', selectedRequest.country || 'N/A']);
        data.push(['University', selectedRequest.university || 'N/A']);
        data.push(['Field of Interest', selectedRequest.field_of_interest || 'N/A']);
        data.push(['Other Field', selectedRequest.other_field || 'N/A']);
        data.push(['Experience Level', selectedRequest.experience_level || 'N/A']);
        data.push(['Skills', selectedRequest.skills || 'N/A']);
        data.push(['Portfolio', selectedRequest.portfolio || 'N/A']);
        data.push(['Motivation', selectedRequest.motivation || 'N/A']);
        data.push(['Inspiration', selectedRequest.inspiration || 'N/A']);
        data.push(['Expectations', selectedRequest.expectations || 'N/A']);
        data.push(['Contribution', selectedRequest.contribution || 'N/A']);
        data.push(['Teamwork', selectedRequest.teamwork || 'N/A']);
        data.push(['Hours Per Week', selectedRequest.hours_per_week || 'N/A']);
        data.push(['Activities', selectedRequest.activities ? selectedRequest.activities.join(', ') : 'N/A']);
        data.push(['Previous Experience', selectedRequest.previous_experience || 'N/A']);
        data.push(['Future Vision', selectedRequest.future_vision || 'N/A']);
        data.push(['Project Idea', selectedRequest.project_idea || 'N/A']);
        data.push(['Agreement', selectedRequest.agreement ? 'Yes' : 'No']);
        data.push(['Status', selectedRequest.status]);
        data.push(['Created At', new Date(selectedRequest.created_at).toLocaleString()]);
        data.push(['Admin Notes', selectedRequest.admin_notes || 'N/A']);
      } else if (isConsultationRequest(selectedRequest)) {
        data.push(['Field', 'Value']);
        data.push(['Name', selectedRequest.full_name]);
        data.push(['Email', selectedRequest.email]);
        data.push(['Phone', selectedRequest.phone || 'N/A']);
        data.push(['Organization', selectedRequest.organization || 'N/A']);
        data.push(['Consultation Type', selectedRequest.consultation_type || 'N/A']);
        data.push(['Other Type', selectedRequest.other_type || 'N/A']);
        data.push(['Project Description', selectedRequest.project_description || 'N/A']);
        data.push(['Consultation Format', selectedRequest.consultation_format || 'N/A']);
        data.push(['Duration', selectedRequest.duration || 'N/A']);
        data.push(['Preferred Date', selectedRequest.preferred_date ? new Date(selectedRequest.preferred_date).toLocaleDateString() : 'N/A']);
        data.push(['Preferred Time', selectedRequest.preferred_time || 'N/A']);
        data.push(['Documents', selectedRequest.documents || 'N/A']);
        data.push(['Additional Notes', selectedRequest.additional_notes || 'N/A']);
        data.push(['Status', selectedRequest.status]);
        data.push(['Created At', new Date(selectedRequest.created_at).toLocaleString()]);
        data.push(['Admin Notes', selectedRequest.admin_notes || 'N/A']);
      }

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Request Details');

      const requestType = isJoinRequest(selectedRequest) ? 'join' : 'consultation';
      const fileName = `${selectedRequest.full_name}_${requestType}_request.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error('Error generating Excel:', error);
      alert('Error generating Excel file. Please try again.');
    }
  };

  const handleLogout = async () => {
    await AdminAuth.logout();
    window.location.href = '/';
  };

  const saveAdminNotes = async () => {
    if (!selectedRequest || !adminNotes.trim()) return;
    
    try {
      setIsUpdating(true);
      
      const tableName = isJoinRequest(selectedRequest) ? 'join_requests' : 'consultation_requests';
      
      const { error } = await supabase
        .from(tableName)
        .update({ 
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedRequest.id);
      
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      // Refresh data to get updated notes
      await fetchData();
      alert('Notes saved successfully!');
    } catch (error: any) {
      console.error('Error saving notes:', error);
      alert(`Error saving notes: ${error.message || 'Unknown error'}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateRequestStatus = async (id: string, status: 'responded' | 'under_study' | 'rejected', type: 'join' | 'consultation') => {
    try {
      setIsUpdating(true);
      
      // Use Supabase directly instead of backend
      const tableName = type === 'join' ? 'join_requests' : 'consultation_requests';
      
      const { error } = await supabase
        .from(tableName)
        .update({ 
          status,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      // Refresh data
      await fetchData();
      setSelectedRequest(null);
      setAdminNotes('');
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert(`Error updating status: ${error.message || 'Unknown error'}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteRequest = async (id: string, type: 'join' | 'consultation') => {
    if (!confirm('Are you sure you want to move this request to trash? It will be permanently deleted after 90 days.')) {
      return;
    }

    try {
      setDeletingRequest(id);
      
      const tableName = type === 'join' ? 'join_requests' : 'consultation_requests';
      
      const { error } = await supabase
        .from(tableName)
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
      alert('Request moved to trash successfully!');
    } catch (error: any) {
      console.error('Error deleting request:', error);
      alert(`Error deleting request: ${error.message || 'Unknown error'}`);
    } finally {
      setDeletingRequest(null);
    }
  };

  const restoreRequest = async (id: string, type: 'join' | 'consultation') => {
    try {
      setDeletingRequest(id);
      
      const tableName = type === 'join' ? 'join_requests' : 'consultation_requests';
      
      const { error } = await supabase
        .from(tableName)
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
      alert('Request restored successfully!');
    } catch (error: any) {
      console.error('Error restoring request:', error);
      alert(`Error restoring request: ${error.message || 'Unknown error'}`);
    } finally {
      setDeletingRequest(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'under_study': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'responded': return CheckCircle;
      case 'under_study': return Clock;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const getFieldIcon = (field: string) => {
    switch (field) {
      case 'Software Development': return Code;
      case 'UI/UX Design': return Palette;
      case 'Startup & Innovation': return Lightbulb;
      case 'Career Guidance': return Target;
      case 'Project Management': return Briefcase;
      default: return Briefcase;
    }
  };

  // Filter and sort data
  const allRequests = [
    ...joinRequests.map(req => ({ ...req, type: 'join' as const })),
    ...consultationRequests.map(req => ({ ...req, type: 'consultation' as const }))
  ];

  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = 
      request.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.phone && request.phone.includes(searchTerm)) ||
      (isJoinRequest(request) && request.university && request.university.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (isConsultationRequest(request) && request.organization && request.organization.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = requestType === 'all' || request.type === requestType;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    let aValue: any = a[sortField as keyof typeof a];
    let bValue: any = b[sortField as keyof typeof b];

    if (sortField === 'created_at') {
      aValue = new Date(a.created_at).getTime();
      bValue = new Date(b.created_at).getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const stats = [
    {
      title: 'Total Join Requests',
      value: joinRequests.length,
      icon: UserPlus,
      color: 'from-[#6B2D73] to-[#9347a0]',
      change: '+12%'
    },
    {
      title: 'Total Consultations',
      value: consultationRequests.length,
      icon: MessageCircle,
      color: 'from-[#2D7363] to-[#5fa896]',
      change: '+8%'
    },
    {
      title: 'Under Study',
      value: allRequests.filter(r => r.status === 'under_study').length,
      icon: Clock,
      color: 'from-[#b376bf] to-[#d4aad9]',
      change: '+5%'
    },
    {
      title: 'Responded',
      value: allRequests.filter(r => r.status === 'responded').length,
      icon: CheckCircle,
      color: 'from-[#2D7363] to-[#5fa896]',
      change: '+15%'
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6B2D73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#F8F8F8] text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6B2D73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#F8F8F8] text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white" suppressHydrationWarning>
      {/* Header */}
      <div className="bg-[#131422]/50 backdrop-blur-xl border-b border-[#6B2D73]/20 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent leading-tight">
              {showTrash ? 'Trash' : 'Admin Dashboard'}
            </h1>
            <p className="text-[#F8F8F8]/80 mt-2 text-sm sm:text-base">
              {showTrash 
                ? 'Manage deleted requests (permanently deleted after 90 days)' 
                : 'Manage join requests and consultations'
              }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowTrash(!showTrash)}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
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
                  Back to Requests
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
              className="p-2 bg-[#6B2D73]/20 hover:bg-[#6B2D73]/40 rounded-lg transition-colors duration-300"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mt-4 sm:mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'join', label: 'Join Requests', icon: UserPlus },
            { id: 'consultation', label: 'Consultations', icon: MessageCircle },
            { id: 'contact', label: 'Contact Messages', icon: Mail }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#6B2D73] text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/20 p-4 sm:p-6 hover:border-[#6B2D73]/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-sm text-green-400 font-semibold">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-[#F8F8F8]/60 text-sm">
                    {stat.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/20 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Recent Requests
                </h2>
                <button
                  onClick={() => setActiveTab('join')}
                  className="text-[#6B2D73] hover:text-[#9347a0] transition-colors duration-300"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {sortedRequests.slice(0, 5).map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        request.type === 'join' ? 'text-[#6B2D73]' : 'text-[#2D7363]'
                      } bg-current`}></div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {request.full_name}
                        </h3>
                        <p className="text-sm text-[#F8F8F8]/60">
                          {request.email} • {request.type === 'join' ? 'Join Request' : 'Consultation'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                        {request.status.replace('_', ' ')}
                      </span>
                    <NoSSR fallback={<span className="text-sm text-[#F8F8F8]/60">Loading...</span>}>
                      <span className="text-sm text-[#F8F8F8]/60" suppressHydrationWarning>
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </NoSSR>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {(activeTab === 'join' || activeTab === 'consultation') && (
          <>
            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/20 p-6"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name, email, phone, university..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as RequestType)}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none transition-colors duration-300"
                  >
                    <option value="all">All Types</option>
                    <option value="join">Join Requests</option>
                    <option value="consultation">Consultations</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none transition-colors duration-300"
                  >
                    <option value="all">All Status</option>
                    <option value="under_study">Under Study</option>
                    <option value="responded">Responded</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <select
                    value={`${sortField}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortField(field as SortField);
                      setSortOrder(order as SortOrder);
                    }}
                    className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-[#6B2D73] focus:outline-none transition-colors duration-300"
                  >
                    <option value="created_at-desc">Newest First</option>
                    <option value="created_at-asc">Oldest First</option>
                    <option value="full_name-asc">Name A-Z</option>
                    <option value="full_name-desc">Name Z-A</option>
                    <option value="email-asc">Email A-Z</option>
                    <option value="email-desc">Email Z-A</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Requests Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#131422]/50 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/20 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Field/Details</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Preferred Time</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {sortedRequests.map((request, index) => (
                      <motion.tr
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="hover:bg-gray-800/30 transition-colors duration-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${
                                request.type === 'join' 
                                  ? 'from-[#6B2D73] to-[#9347a0]' 
                                  : 'from-[#2D7363] to-[#5fa896]'
                              } flex items-center justify-center`}>
                                <span className="text-white font-semibold text-sm">
                                  {request.full_name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {request.full_name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {request.type === 'join' ? 'Join Request' : 'Consultation'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{request.email}</div>
                          {request.phone && (
                            <div className="text-sm text-gray-400">{request.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {request.type === 'join' ? (
                              <UserPlus className="w-4 h-4 text-[#6B2D73] mr-2" />
                            ) : (
                              <MessageCircle className="w-4 h-4 text-[#2D7363] mr-2" />
                            )}
                            <span className="text-sm text-gray-300">
                              {request.type === 'join' ? 'Join' : 'Consultation'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {isJoinRequest(request) ? (
                              <>
                                {request.field_of_interest && (
                                  <>
                                    {(() => {
                                      const IconComponent = getFieldIcon(request.field_of_interest!);
                                      return <IconComponent className="w-4 h-4 text-gray-400 mr-2" />;
                                    })()}
                                    <div className="flex flex-col">
                                      <span className="text-sm text-gray-300">
                                        {request.field_of_interest}
                                      </span>
                                      {request.university && (
                                        <span className="text-xs text-gray-400">
                                          🎓 {request.university}
                                        </span>
                                      )}
                                      {request.country && (
                                        <span className="text-xs text-gray-400">
                                          🌍 {request.country}
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </>
                            ) : isConsultationRequest(request) ? (
                              <>
                                {request.consultation_type && (
                                  <>
                                    <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                                    <div className="flex flex-col">
                                      <span className="text-sm text-gray-300">
                                        {request.consultation_type}
                                      </span>
                                      {request.organization && (
                                        <span className="text-xs text-gray-400">
                                          🏢 {request.organization}
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {isJoinRequest(request) ? (
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Level: {request.experience_level || 'N/A'}</span>
                                <span className="text-xs text-gray-400">Hours: {request.hours_per_week || 'N/A'}</span>
                              </div>
                            ) : isConsultationRequest(request) ? (
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Format: {request.consultation_format || 'N/A'}</span>
                                <span className="text-xs text-gray-400">Duration: {request.duration || 'N/A'}</span>
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {request.type === 'consultation' && request.preferred_date ? (
                              <div className="flex flex-col">
                                <span suppressHydrationWarning>📅 {new Date(request.preferred_date).toLocaleDateString()}</span>
                                {request.preferred_time && (
                                  <span className="text-xs text-gray-400">🕐 {request.preferred_time}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {(() => {
                              const IconComponent = getStatusIcon(request.status);
                              return <IconComponent className="w-3 h-3 mr-1" />;
                            })()}
                            {request.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div>
                            <NoSSR fallback="Loading...">
                              <span suppressHydrationWarning>
                                {new Date(request.created_at).toLocaleDateString()}
                              </span>
                            </NoSSR>
                            {showTrash && request.deleted_at && (
                              <div className="text-xs text-red-400 mt-1">
                                <NoSSR fallback="Loading...">
                                  <span suppressHydrationWarning>
                                    Deleted: {new Date(request.deleted_at).toLocaleDateString()}
                                  </span>
                                </NoSSR>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRequestClick(request)}
                              className="text-[#6B2D73] hover:text-[#9347a0] transition-colors duration-300"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRequestClick(request)}
                              className="text-[#2D7363] hover:text-[#5fa896] transition-colors duration-300"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {showTrash ? (
                              <button
                                onClick={() => restoreRequest(request.id, request.type)}
                                disabled={deletingRequest === request.id}
                                className="text-green-500 hover:text-green-400 transition-colors duration-300 disabled:opacity-50"
                                title="Restore Request"
                              >
                                {deletingRequest === request.id ? (
                                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                  </svg>
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => deleteRequest(request.id, request.type)}
                                disabled={deletingRequest === request.id}
                                className="text-red-500 hover:text-red-400 transition-colors duration-300 disabled:opacity-50"
                                title="Move to Trash"
                              >
                                {deletingRequest === request.id ? (
                                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#131422] rounded-2xl border border-[#6B2D73]/20 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Request Details
              </h2>
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
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div id="request-details" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <p className="text-white">{selectedRequest.full_name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedRequest.email}</p>
                  </div>
                  
                  {selectedRequest.phone && (
                    <div>
                      <label className="text-sm text-gray-400">Phone</label>
                      <p className="text-white">{selectedRequest.phone}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.university && (
                    <div>
                      <label className="text-sm text-gray-400">University</label>
                      <p className="text-white">{selectedRequest.university}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.organization && (
                    <div>
                      <label className="text-sm text-gray-400">Organization</label>
                      <p className="text-white">{selectedRequest.organization}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.field_of_interest && (
                    <div>
                      <label className="text-sm text-gray-400">Field of Interest</label>
                      <p className="text-white">{selectedRequest.field_of_interest}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.consultation_type && (
                    <div>
                      <label className="text-sm text-gray-400">Consultation Type</label>
                      <p className="text-white">{selectedRequest.consultation_type}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.preferred_date && (
                    <div>
                      <label className="text-sm text-gray-400">Preferred Date</label>
                      <p className="text-white" suppressHydrationWarning>
                        {new Date(selectedRequest.preferred_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.preferred_time && (
                    <div>
                      <label className="text-sm text-gray-400">Preferred Time</label>
                      <p className="text-white">{selectedRequest.preferred_time}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.consultation_format && (
                    <div>
                      <label className="text-sm text-gray-400">Consultation Format</label>
                      <p className="text-white">{selectedRequest.consultation_format}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.duration && (
                    <div>
                      <label className="text-sm text-gray-400">Duration</label>
                      <p className="text-white">{selectedRequest.duration}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>
                
                <div className="space-y-3">
                  {isJoinRequest(selectedRequest) && selectedRequest.age && (
                    <div>
                      <label className="text-sm text-gray-400">Age</label>
                      <p className="text-white">{selectedRequest.age}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.country && (
                    <div>
                      <label className="text-sm text-gray-400">Country</label>
                      <p className="text-white">{selectedRequest.country}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.other_field && (
                    <div>
                      <label className="text-sm text-gray-400">Other Field</label>
                      <p className="text-white">{selectedRequest.other_field}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.portfolio && (
                    <div>
                      <label className="text-sm text-gray-400">Portfolio</label>
                      <p className="text-white text-sm break-all">{selectedRequest.portfolio}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.motivation && (
                    <div>
                      <label className="text-sm text-gray-400">Motivation</label>
                      <p className="text-white text-sm">{selectedRequest.motivation}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.inspiration && (
                    <div>
                      <label className="text-sm text-gray-400">Inspiration</label>
                      <p className="text-white text-sm">{selectedRequest.inspiration}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.expectations && (
                    <div>
                      <label className="text-sm text-gray-400">Expectations</label>
                      <p className="text-white text-sm">{selectedRequest.expectations}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.contribution && (
                    <div>
                      <label className="text-sm text-gray-400">Contribution</label>
                      <p className="text-white text-sm">{selectedRequest.contribution}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.teamwork && (
                    <div>
                      <label className="text-sm text-gray-400">Teamwork</label>
                      <p className="text-white text-sm">{selectedRequest.teamwork}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.hours_per_week && (
                    <div>
                      <label className="text-sm text-gray-400">Hours Per Week</label>
                      <p className="text-white">{selectedRequest.hours_per_week}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.activities && selectedRequest.activities.length > 0 && (
                    <div>
                      <label className="text-sm text-gray-400">Activities</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedRequest.activities.map((activity, index) => (
                          <span key={index} className="px-2 py-1 bg-[#6B2D73]/20 text-[#b376bf] rounded-md text-xs">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.previous_experience && (
                    <div>
                      <label className="text-sm text-gray-400">Previous Experience</label>
                      <p className="text-white text-sm">{selectedRequest.previous_experience}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.future_vision && (
                    <div>
                      <label className="text-sm text-gray-400">Future Vision</label>
                      <p className="text-white text-sm">{selectedRequest.future_vision}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.project_idea && (
                    <div>
                      <label className="text-sm text-gray-400">Project Idea</label>
                      <p className="text-white text-sm">{selectedRequest.project_idea}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.agreement !== null && (
                    <div>
                      <label className="text-sm text-gray-400">Agreement</label>
                      <p className="text-white">{selectedRequest.agreement ? '✅ Agreed' : '❌ Not Agreed'}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.project_description && (
                    <div>
                      <label className="text-sm text-gray-400">Project Description</label>
                      <p className="text-white text-sm">{selectedRequest.project_description}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.skills && (
                    <div>
                      <label className="text-sm text-gray-400">Skills</label>
                      <p className="text-white text-sm">{selectedRequest.skills}</p>
                    </div>
                  )}

                  {isJoinRequest(selectedRequest) && selectedRequest.experience_level && (
                    <div>
                      <label className="text-sm text-gray-400">Experience Level</label>
                      <p className="text-white">{selectedRequest.experience_level}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.other_type && (
                    <div>
                      <label className="text-sm text-gray-400">Other Type</label>
                      <p className="text-white">{selectedRequest.other_type}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.documents && (
                    <div>
                      <label className="text-sm text-gray-400">Documents</label>
                      <p className="text-white">{selectedRequest.documents}</p>
                    </div>
                  )}

                  {isConsultationRequest(selectedRequest) && selectedRequest.additional_notes && (
                    <div>
                      <label className="text-sm text-gray-400">Additional Notes</label>
                      <p className="text-white text-sm">{selectedRequest.additional_notes}</p>
                    </div>
                  )}
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
                  onClick={() => saveAdminNotes()}
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
                  onClick={() => updateRequestStatus(selectedRequest.id, 'responded', isJoinRequest(selectedRequest) ? 'join' : 'consultation')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Responded
                </button>
                <button
                  onClick={() => updateRequestStatus(selectedRequest.id, 'under_study', isJoinRequest(selectedRequest) ? 'join' : 'consultation')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Under Study
                </button>
                <button
                  onClick={() => updateRequestStatus(selectedRequest.id, 'rejected', isJoinRequest(selectedRequest) ? 'join' : 'consultation')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Rejected
                </button>
              </div>
              
              <div className="text-sm text-gray-400">
                Created: <NoSSR fallback="Loading...">
                  <span suppressHydrationWarning>
                    {new Date(selectedRequest.created_at).toLocaleString()}
                  </span>
                </NoSSR>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contact Messages Tab */}
      {activeTab === 'contact' && (
        <ContactMessagesStats />
      )}
    </div>
  );
}