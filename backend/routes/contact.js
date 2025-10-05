const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYwNjA2NCwiZXhwIjoyMDc1MTgyMDY0fQ.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

// Use anon key for all operations (RLS will handle permissions)
const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);

// Submit contact message
router.post('/submit', async (req, res) => {
  try {
    const { full_name, email, phone, company, subject, message, category } = req.body;

    // Validate required fields
    if (!full_name || !email || !subject || !message || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Validate category
    const validCategories = ['general', 'companies', 'partnerships', 'media'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category'
      });
    }

    // Insert message using public client
    const { data, error } = await supabasePublic
      .from('contact_messages')
      .insert([{
        full_name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
        category,
        status: 'new',
        priority: 'medium'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error inserting contact message:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to submit message'
      });
    }

    res.json({
      success: true,
      message: 'Message submitted successfully',
      data
    });

  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get all contact messages (admin only)
router.get('/messages', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact messages:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch messages'
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Contact messages fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get contact message by ID
router.get('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching contact message:', error);
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Contact message fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update contact message status
router.patch('/messages/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes, priority } = req.body;

    // Validate status
    const validStatuses = ['new', 'read', 'responded', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    // Validate priority
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid priority'
      });
    }

    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (status) updateData.status = status;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
    if (priority) updateData.priority = priority;

    // Set responded_at if status is 'responded'
    if (status === 'responded') {
      updateData.responded_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact message:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update message'
      });
    }

    res.json({
      success: true,
      message: 'Message updated successfully',
      data
    });

  } catch (error) {
    console.error('Contact message update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Delete contact message
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact message:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to delete message'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Contact message delete error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const { data: messages, error } = await supabaseAdmin
      .from('contact_messages')
      .select('status, category, created_at');

    if (error) {
      console.error('Error fetching contact stats:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch statistics'
      });
    }

    const stats = {
      total: messages.length,
      byStatus: {
        new: messages.filter(m => m.status === 'new').length,
        read: messages.filter(m => m.status === 'read').length,
        responded: messages.filter(m => m.status === 'responded').length,
        closed: messages.filter(m => m.status === 'closed').length
      },
      byCategory: {
        general: messages.filter(m => m.category === 'general').length,
        companies: messages.filter(m => m.category === 'companies').length,
        partnerships: messages.filter(m => m.category === 'partnerships').length,
        media: messages.filter(m => m.category === 'media').length
      },
      recent: messages.filter(m => {
        const messageDate = new Date(m.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return messageDate > weekAgo;
      }).length
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;
