const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU'
);

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Get join requests count
    const { count: joinCount } = await supabase
      .from('join_requests')
      .select('*', { count: 'exact', head: true });

    // Get consultation requests count
    const { count: consultationCount } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true });

    // Get pending requests count
    const { count: pendingJoinCount } = await supabase
      .from('join_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: pendingConsultationCount } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get approved requests count
    const { count: approvedJoinCount } = await supabase
      .from('join_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    const { count: approvedConsultationCount } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    res.json({
      totalJoinRequests: joinCount || 0,
      totalConsultationRequests: consultationCount || 0,
      pendingRequests: (pendingJoinCount || 0) + (pendingConsultationCount || 0),
      approvedRequests: (approvedJoinCount || 0) + (approvedConsultationCount || 0)
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent requests
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Get recent join requests
    const { data: joinRequests } = await supabase
      .from('join_requests')
      .select('id, full_name, email, status, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Get recent consultation requests
    const { data: consultationRequests } = await supabase
      .from('consultation_requests')
      .select('id, full_name, email, status, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Combine and sort by date
    const allRequests = [
      ...(joinRequests || []).map(req => ({ ...req, type: 'join' })),
      ...(consultationRequests || []).map(req => ({ ...req, type: 'consultation' }))
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json({ requests: allRequests.slice(0, limit) });

  } catch (error) {
    console.error('Get recent requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
