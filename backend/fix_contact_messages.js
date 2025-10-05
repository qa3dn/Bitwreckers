const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixContactMessages() {
    console.log('Fixing contact_messages table...');
    
    try {
        // Read SQL file
        const sqlContent = fs.readFileSync('fix_contact_messages_table.sql', 'utf8');
        
        // Split into individual statements
        const statements = sqlContent.split(';').filter(stmt => stmt.trim());
        
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i].trim();
            if (!statement) continue;
            
            console.log(`\nExecuting statement ${i+1}/${statements.length}...`);
            console.log(`SQL: ${statement.substring(0, 100)}...`);
            
            try {
                const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
                
                if (error) {
                    console.log(`❌ Error: ${error.message}`);
                } else {
                    console.log('✅ Success');
                }
            } catch (err) {
                console.log(`❌ Exception: ${err.message}`);
            }
        }
        
        console.log('\nFix completed!');
        
        // Test the table
        console.log('\nTesting table...');
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .limit(5);
            
        if (error) {
            console.log(`❌ Test Error: ${error.message}`);
        } else {
            console.log(`✅ Test Success: Found ${data.length} records`);
            console.log('Sample records:', data);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the fix
fixContactMessages();

