import { supabase } from './supabase';

// Join Request API
export const submitJoinRequest = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from('join_requests')
      .insert([{
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        country: formData.country,
        university: formData.university,
        field_of_interest: formData.fieldOfInterest,
        other_field: formData.otherField,
        experience_level: formData.experienceLevel,
        skills: formData.skills,
        portfolio: formData.portfolio,
        motivation: formData.motivation,
        inspiration: formData.inspiration,
        expectations: formData.expectations,
        contribution: formData.contribution,
        teamwork: formData.teamwork,
        hours_per_week: formData.hoursPerWeek,
        activities: formData.activities || [],
        previous_experience: formData.previousExperience,
        future_vision: formData.futureVision,
        project_idea: formData.projectIdea,
        agreement: formData.agreement,
        status: 'under_study' // Explicitly set the new status
      }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Join request error:', error);
    throw error;
  }
};

// Consultation Request API
export const submitConsultationRequest = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([{
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        consultation_type: formData.consultationType,
        other_type: formData.otherType,
        project_description: formData.projectDescription,
        consultation_format: formData.consultationFormat,
        duration: formData.duration,
        preferred_time: formData.preferredTime,
        preferred_date: formData.preferredDate,
        documents: formData.documents,
        additional_notes: formData.additionalNotes,
        status: 'under_study' // Explicitly set the new status
      }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Consultation request error:', error);
    throw error;
  }
};

// Contact form submission
export interface ContactFormData {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  category: 'general' | 'companies' | 'partnerships' | 'media';
}

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        category: formData.category,
        status: 'new',
        priority: 'medium'
      }])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Contact form error:', error);
    throw error;
  }
};
