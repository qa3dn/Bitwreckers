const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testContactMessages() {
    console.log('Testing contact_messages functionality...');
    
    try {
        // First, let's try to insert a record
        console.log('Attempting to insert a test record...');
        const { data: insertData, error: insertError } = await supabase
            .from('contact_messages')
            .insert([{
                full_name: 'Test User',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'Test message for RLS testing',
                category: 'general'
            }])
            .select();
            
        if (insertError) {
            console.log('❌ Insert failed:', insertError.message);
            console.log('Error code:', insertError.code);
            
            if (insertError.code === '42501') {
                console.log('\n🔧 RLS Policy Issue Confirmed');
                console.log('\nTo fix this issue, you have two options:');
                console.log('\nOption 1: Manual Fix via Supabase Dashboard');
                console.log('1. Go to https://supabase.com/dashboard');
                console.log('2. Select your project');
                console.log('3. Go to SQL Editor');
                console.log('4. Run this SQL:');
                console.log(`
-- Disable RLS temporarily for testing
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Or create proper policies
CREATE POLICY "Allow public to insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to view contact messages" ON contact_messages
    FOR SELECT USING (true);
                `);
                
                console.log('\nOption 2: Use Service Role Key');
                console.log('The backend should use the service role key instead of anon key for admin operations.');
                console.log('Current key type: anon (public)');
                console.log('Required key type: service_role (admin)');
            }
        } else {
            console.log('✅ Insert successful!');
            console.log('Inserted record:', insertData[0]);
            
            // Test reading
            console.log('\nTesting read...');
            const { data: readData, error: readError } = await supabase
                .from('contact_messages')
                .select('*');
                
            if (readError) {
                console.log('❌ Read failed:', readError.message);
            } else {
                console.log('✅ Read successful!');
                console.log(`Found ${readData.length} records`);
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
testContactMessages();

