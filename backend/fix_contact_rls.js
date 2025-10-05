const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixContactRLS() {
    console.log('Fixing contact_messages RLS policies...');
    
    try {
        // First, let's disable RLS temporarily to test
        console.log('Disabling RLS temporarily...');
        
        // We can't disable RLS via client, so let's try to insert with proper policies
        // Let's check what policies exist
        console.log('Checking current policies...');
        
        // Try to insert a test record
        console.log('Testing insert with current policies...');
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
            console.log('Error code:', insertError.code);
            
            if (insertError.code === '42501') {
                console.log('\n🔧 RLS Policy Issue Detected');
                console.log('The table has RLS enabled but no policies allow public inserts.');
                console.log('\nTo fix this, you need to:');
                console.log('1. Go to https://supabase.com/dashboard');
                console.log('2. Select your project');
                console.log('3. Go to Authentication > Policies');
                console.log('4. Find the contact_messages table');
                console.log('5. Add a policy for INSERT:');
                console.log('   - Policy name: "Allow public to insert contact messages"');
                console.log('   - Operation: INSERT');
                console.log('   - Target roles: public');
                console.log('   - USING expression: true');
                console.log('\nOr run this SQL in the SQL Editor:');
                console.log(`
CREATE POLICY "Allow public to insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);
                `);
            }
        } else {
            console.log('✅ Insert successful');
            console.log('Inserted record:', insertData[0]);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
fixContactRLS();

