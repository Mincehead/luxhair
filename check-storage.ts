
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
    console.log('Checking Storage Buckets...');
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('Error listing buckets:', error.message);
        return;
    }

    console.log('Buckets found:', buckets.length);
    const productsBucket = buckets.find(b => b.name === 'products');

    if (productsBucket) {
        console.log('✅ "products" bucket found.');
        console.log('   Public:', productsBucket.public);

        if (!productsBucket.public) {
            console.error('❌ WARNING: "products" bucket is set to PRIVATE. getPublicUrl will not work without a signed token.');
        }

        const { data: files, error: listError } = await supabase.storage.from('products').list();
        if (listError) {
            console.error('Error listing files in products:', listError.message);
        } else {
            console.log(`   Files in bucket: ${files.length}`);
            if (files.length > 0) {
                console.log('   Sample file:', files[0].name);
                const { data } = supabase.storage.from('products').getPublicUrl(files[0].name);
                console.log('   Sample Public URL:', data.publicUrl);
            }
        }

    } else {
        console.error('❌ "products" bucket NOT found.');
    }
}

checkStorage();
