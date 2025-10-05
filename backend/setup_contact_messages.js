const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupContactMessages() {
    console.log('Setting up contact_messages table...');
    
    try {
        // Read SQL file
        const sqlContent = fs.readFileSync('create_contact_messages_table.sql', 'utf8');
        
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
        
        console.log('\nSetup completed!');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the setup
setupContactMessages();

