const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyRLSFix() {
    console.log('Applying RLS fix for contact_messages...');
    
    try {
        // Read the SQL file
        const sqlContent = fs.readFileSync('fix_contact_rls_policies.sql', 'utf8');
        
        // Split by semicolon and execute each statement
        const statements = sqlContent
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        console.log(`Found ${statements.length} SQL statements to execute`);
        
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.trim()) {
                console.log(`Executing statement ${i + 1}/${statements.length}...`);
                console.log(`SQL: ${statement.substring(0, 100)}...`);
                
                try {
                    const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
                    
                    if (error) {
                        console.log(`❌ Error in statement ${i + 1}:`, error.message);
                        // Continue with next statement
                    } else {
                        console.log(`✅ Statement ${i + 1} executed successfully`);
                    }
                } catch (err) {
                    console.log(`❌ Exception in statement ${i + 1}:`, err.message);
                }
            }
        }
        
        // Test the fix
        console.log('\nTesting the fix...');
        const { data: testData, error: testError } = await supabase
            .from('contact_messages')
            .insert([{
                full_name: 'Test User After Fix',
                email: 'test-after-fix@example.com',
                subject: 'Test Subject After Fix',
                message: 'Test message after RLS fix',
                category: 'general'
            }])
            .select();
            
        if (testError) {
            console.log('❌ Test insert failed:', testError.message);
            console.log('\nManual fix required:');
            console.log('1. Go to https://supabase.com/dashboard');
            console.log('2. Select your project');
            console.log('3. Go to SQL Editor');
            console.log('4. Run the SQL from fix_contact_rls_policies.sql');
        } else {
            console.log('✅ Test insert successful!');
            console.log('Inserted record:', testData[0]);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
applyRLSFix();

