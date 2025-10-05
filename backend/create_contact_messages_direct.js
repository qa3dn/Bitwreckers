const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://iprvecbzvzzyrepzlsho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcnZlY2J6dnp6eXJlcHpsc2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDYwNjQsImV4cCI6MjA3NTE4MjA2NH0.aPzFSPMW4szPrBJDIwiD3sVPLGivRP91hornxvIqwrU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createContactMessagesTable() {
    console.log('Creating contact_messages table...');
    
    try {
        // First, let's try to insert a test record to see if table exists
        const { data: testData, error: testError } = await supabase
            .from('contact_messages')
            .select('*')
            .limit(1);
            
        if (testError && testError.code === 'PGRST116') {
            console.log('Table does not exist. Creating it...');
            
            // Table doesn't exist, we need to create it via Supabase Dashboard
            console.log('❌ Table contact_messages does not exist.');
            console.log('Please create the table manually in Supabase Dashboard:');
            console.log('');
            console.log('1. Go to https://supabase.com/dashboard');
            console.log('2. Select your project');
            console.log('3. Go to SQL Editor');
            console.log('4. Run this SQL:');
            console.log('');
            console.log('CREATE TABLE contact_messages (');
            console.log('    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
            console.log('    full_name VARCHAR(255) NOT NULL,');
            console.log('    email VARCHAR(255) NOT NULL,');
            console.log('    phone VARCHAR(50),');
            console.log('    company VARCHAR(255),');
            console.log('    subject VARCHAR(500) NOT NULL,');
            console.log('    message TEXT NOT NULL,');
            console.log('    category VARCHAR(50) NOT NULL CHECK (category IN (\'general\', \'companies\', \'partnerships\', \'media\')),');
            console.log('    status VARCHAR(50) DEFAULT \'new\' CHECK (status IN (\'new\', \'read\', \'responded\', \'closed\')),');
            console.log('    priority VARCHAR(50) DEFAULT \'medium\' CHECK (priority IN (\'low\', \'medium\', \'high\', \'urgent\')),');
            console.log('    admin_notes TEXT,');
            console.log('    responded_at TIMESTAMP WITH TIME ZONE,');
            console.log('    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),');
            console.log('    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
            console.log(');');
            console.log('');
            console.log('5. After creating the table, run this script again.');
            return;
        }
        
        if (testError) {
            console.log('❌ Error checking table:', testError.message);
            return;
        }
        
        console.log('✅ Table contact_messages exists!');
        
        // Insert sample data
        console.log('Inserting sample data...');
        
        const sampleData = [
            {
                full_name: 'أحمد محمد',
                email: 'ahmed@example.com',
                phone: '+962791234567',
                company: 'شركة التقنية المتقدمة',
                subject: 'طلب شراكة استراتيجية',
                message: 'نحن شركة رائدة في مجال التكنولوجيا ونتطلع لشراكة مع Bitwreckers لتطوير حلول مبتكرة',
                category: 'partnerships',
                status: 'new',
                priority: 'high'
            },
            {
                full_name: 'سارة أحمد',
                email: 'sara@techcorp.com',
                phone: '+962791234568',
                company: 'TechCorp',
                subject: 'استفسار عن الخدمات',
                message: 'نود معرفة المزيد عن خدمات تطوير التطبيقات التي تقدمونها',
                category: 'companies',
                status: 'read',
                priority: 'medium'
            },
            {
                full_name: 'محمد علي',
                email: 'mohammed@news.com',
                phone: '+962791234569',
                company: 'TechNews',
                subject: 'طلب مقابلة صحفية',
                message: 'نود إجراء مقابلة مع فريق Bitwreckers حول رؤيتكم المستقبلية',
                category: 'media',
                status: 'new',
                priority: 'medium'
            }
        ];
        
        const { data, error } = await supabase
            .from('contact_messages')
            .insert(sampleData);
            
        if (error) {
            console.log('❌ Error inserting sample data:', error.message);
        } else {
            console.log('✅ Sample data inserted successfully!');
        }
        
        // Test the table
        console.log('Testing table...');
        const { data: testData2, error: testError2 } = await supabase
            .from('contact_messages')
            .select('*')
            .limit(5);
            
        if (testError2) {
            console.log('❌ Test Error:', testError2.message);
        } else {
            console.log(`✅ Test Success: Found ${testData2.length} records`);
            console.log('Sample records:', testData2);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
createContactMessagesTable();

