const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkContactMessages() {
    console.log('Checking contact_messages table...');
    
    try {
        // Check if table exists by trying to select
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*');
            
        if (error) {
            console.log('❌ Error:', error.message);
            console.log('Error code:', error.code);
            console.log('Error details:', error.details);
            console.log('Error hint:', error.hint);
            return;
        }
        
        console.log('✅ Table exists and accessible');
        console.log(`Found ${data.length} records`);
        
        if (data.length > 0) {
            console.log('Sample record:', data[0]);
        }
        
        // Try to insert a test record
        console.log('\nTesting insert...');
        const { data: insertData, error: insertError } = await supabase
            .from('contact_messages')
            .insert([{
                full_name: 'Test User',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'Test message',
                category: 'general'
            }])
            .select();
            
        if (insertError) {
            console.log('❌ Insert Error:', insertError.message);
            console.log('Insert Error code:', insertError.code);
            console.log('Insert Error details:', insertError.details);
            console.log('Insert Error hint:', insertError.hint);
        } else {
            console.log('✅ Insert successful');
            console.log('Inserted record:', insertData[0]);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
checkContactMessages();

