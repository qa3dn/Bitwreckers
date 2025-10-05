const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://iprvecbzvzzyrepzlsho.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU'
);

// Submit join request
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      country,
      university,
      fieldOfInterest,
      otherField,
      experienceLevel,
      skills,
      portfolio,
      motivation,
      inspiration,
      expectations,
      contribution,
      teamwork,
      hoursPerWeek,
      activities,
      previousExperience,
      futureVision,
      projectIdea,
      agreement
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !fieldOfInterest || !experienceLevel || !skills || !motivation) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['fullName', 'email', 'fieldOfInterest', 'experienceLevel', 'skills', 'motivation']
      });
    }

    // Insert into database
    const { data, error } = await supabase
      .from('join_requests')
      .insert([{
        full_name: fullName,
        email,
        phone,
        age,
        country,
        university,
        field_of_interest: fieldOfInterest,
        other_field: otherField,
        experience_level: experienceLevel,
        skills,
        portfolio,
        motivation,
        inspiration,
        expectations,
        contribution,
        teamwork,
        hours_per_week: hoursPerWeek,
        activities: activities || [],
        previous_experience: previousExperience,
        future_vision: futureVision,
        project_idea: projectIdea,
        agreement: agreement || false
      }])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to submit request' });
    }

    // TODO: Send email notification to admin
    // await sendEmailNotification('join_request', data[0]);

    res.status(201).json({ 
      success: true, 
      message: 'Join request submitted successfully',
      id: data[0].id
    });

  } catch (error) {
    console.error('Join request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all join requests (admin only)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('join_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch requests' });
    }

    res.json({ requests: data });
  } catch (error) {
    console.error('Get join requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update join request status (admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    if (!['responded', 'under_study', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData = {
      status,
      admin_notes: admin_notes || null,
      updated_at: new Date().toISOString()
    };

    if (status === 'responded') {
      updateData.responded_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('join_requests')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to update status' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({ 
      success: true, 
      message: 'Status updated successfully',
      request: data[0]
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
