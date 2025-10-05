const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testContactMessages() {
    console.log('Testing contact_messages with direct approach...');
    
    try {
        // Try to insert a test record
        console.log('Inserting test record...');
        const { data: insertData, error: insertError } = await supabase
            .from('contact_messages')
            .insert([{
                full_name: 'Test User Direct',
                email: 'test-direct@example.com',
                subject: 'Test Subject Direct',
                message: 'Test message using direct approach',
                category: 'general'
            }])
            .select();
            
        if (insertError) {
            console.log('❌ Insert failed:', insertError.message);
            console.log('Error code:', insertError.code);
            
            if (insertError.code === '42501') {
                console.log('\n🔧 RLS Policy Issue - Quick Fix Required');
                console.log('\nTo fix this immediately, run this SQL in Supabase Dashboard:');
                console.log('1. Go to https://supabase.com/dashboard');
                console.log('2. Select your project');
                console.log('3. Go to SQL Editor');
                console.log('4. Run this SQL:');
                console.log(`
-- Quick fix: Disable RLS temporarily
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
                `);
                console.log('\nOr create a proper policy:');
                console.log(`
-- Proper fix: Create insert policy
CREATE POLICY "Allow public inserts" ON contact_messages
    FOR INSERT WITH CHECK (true);
                `);
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
                if (readData.length > 0) {
                    console.log('Sample record:', readData[0]);
                }
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
testContactMessages();

