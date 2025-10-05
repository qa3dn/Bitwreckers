'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, User, Briefcase, FileText, Image, ArrowUp, ArrowDown } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar_url?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function TeamMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    avatar_url: '',
    order_index: 0
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Supabase error:', error);
        // If table doesn't exist, show empty state with instructions
        if (error.message.includes('relation "team_members" does not exist') || 
            error.message.includes('relation "public.team_members" does not exist')) {
          setMembers([]);
          return;
        }
        throw error;
      }
      
      setMembers(data || []);
    } catch (error: any) {
      console.error('Error fetching team members:', error);
      // Don't show alert for table not existing, just log it
      if (!error.message.includes('relation "team_members" does not exist') && 
          !error.message.includes('relation "public.team_members" does not exist')) {
        alert(`Error loading team members: ${error.message}`);
      }
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);

      if (editingMember) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update(formData)
          .eq('id', editingMember);
        
        if (error) throw error;
      } else {
        // Add new member
        const maxOrder = Math.max(...members.map(m => m.order_index), 0);
        const { error } = await supabase
          .from('team_members')
          .insert([{ ...formData, order_index: maxOrder + 1 }]);
        
        if (error) throw error;
      }
      
      setShowAddForm(false);
      setEditingMember(null);
      setFormData({ name: '', role: '', description: '', avatar_url: '', order_index: 0 });
      fetchMembers();
    } catch (error: any) {
      console.error('Error saving team member:', error);
      alert(`Error saving team member: ${error.message}`);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      avatar_url: member.avatar_url || '',
      order_index: member.order_index
    });
    setEditingMember(member.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      fetchMembers();
    } catch (error: any) {
      console.error('Error deleting team member:', error);
      alert(`Error deleting team member: ${error.message}`);
    }
  };

  const handleOrderChange = async (id: string, direction: 'up' | 'down') => {
    const memberIndex = members.findIndex(m => m.id === id);
    if (memberIndex === -1) return;
    
    const newIndex = direction === 'up' ? memberIndex - 1 : memberIndex + 1;
    if (newIndex < 0 || newIndex >= members.length) return;
    
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Swap order indices
      const currentMember = members[memberIndex];
      const targetMember = members[newIndex];
      
      await supabase
        .from('team_members')
        .update({ order_index: targetMember.order_index })
        .eq('id', currentMember.id);
      
      await supabase
        .from('team_members')
        .update({ order_index: currentMember.order_index })
        .eq('id', targetMember.id);
      
      fetchMembers();
    } catch (error: any) {
      console.error('Error updating order:', error);
      alert(`Error updating order: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6B2D73] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#F8F8F8] text-lg">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#131422] to-[#1a1a2e] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#b376bf] to-[#d4aad9] bg-clip-text text-transparent leading-tight">
              Team Members Management
            </h1>
            <p className="text-[#F8F8F8]/80 mt-2 text-sm sm:text-base">Manage your team members and their information</p>
          </div>
          <motion.button
            onClick={() => setShowAddForm(true)}
            className="px-4 sm:px-6 py-3 bg-gradient-to-r from-[#6B2D73] to-[#9347a0] text-white rounded-lg hover:from-[#9347a0] hover:to-[#6B2D73] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add Member
          </motion.button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#131422]/80 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingMember(null);
                  setFormData({ name: '', role: '', description: '', avatar_url: '', order_index: 0 });
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#F8F8F8] mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f1b]/50 border border-[#6B2D73]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#6B2D73] focus:outline-none transition-colors"
                    placeholder="Enter member name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F8F8F8] mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f1b]/50 border border-[#6B2D73]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#6B2D73] focus:outline-none transition-colors"
                    placeholder="Enter member role"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F8F8] mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f0f1b]/50 border border-[#6B2D73]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#6B2D73] focus:outline-none transition-colors h-24 resize-none"
                  placeholder="Enter member description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F8F8] mb-2">
                  <Image className="w-4 h-4 inline mr-2" />
                  Avatar URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f0f1b]/50 border border-[#6B2D73]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#6B2D73] focus:outline-none transition-colors"
                  placeholder="Enter avatar image URL"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingMember(null);
                    setFormData({ name: '', role: '', description: '', avatar_url: '', order_index: 0 });
                  }}
                  className="px-6 py-3 border border-[#6B2D73] text-[#b376bf] rounded-lg hover:bg-[#6B2D73] hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#2D7363] to-[#5fa896] text-white rounded-lg hover:from-[#5fa896] hover:to-[#2D7363] transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingMember ? 'Update' : 'Add'} Member
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Team Members List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#131422]/60 backdrop-blur-xl rounded-2xl border border-[#6B2D73]/30 p-6 hover:border-[#6B2D73]/60 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOrderChange(member.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOrderChange(member.id, 'down')}
                    disabled={index === members.length - 1}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 text-[#2D7363] hover:text-[#5fa896] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#6B2D73] to-[#2D7363] rounded-full flex items-center justify-center">
                  {member.avatar_url ? (
                    <img
                      src={member.avatar_url}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-[#b376bf] font-semibold mb-3">{member.role}</p>
                <p className="text-[#F8F8F8]/80 text-sm leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {members.length === 0 && !loading && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Team Members</h3>
            <p className="text-gray-400 mb-4">Start by adding your first team member.</p>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> If you're seeing this message, you may need to run the SQL script to create the team_members table in Supabase. 
                Please run the <code className="bg-yellow-800/50 px-2 py-1 rounded">create_team_members_table.sql</code> file in your Supabase SQL editor.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-[#6B2D73] text-white rounded-lg hover:bg-[#9347a0] transition-colors duration-300"
            >
              Add First Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
