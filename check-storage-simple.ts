
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdapsjwogvyhkfeocstc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYXBzandvZ3Z5aGtmZW9jc3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzczNDksImV4cCI6MjA4MzkxMzM0OX0.UDgbRKdYTOAna8njcUJ9AksPYUxyfzGQcTT9X1QzyAg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
    console.log('Checking Storage Buckets...');
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('Error listing buckets (likely insufficient permissions):', error.message);
        // Even if listing fails, we can verify PUBLIC access by trying to download a known file?
        // Or we can try to upload a dummy file and check the URL?
    } else {
        console.log('Buckets found:', buckets.length);
        const productsBucket = buckets.find((b: any) => b.name === 'products');
        if (productsBucket) {
            console.log('✅ "products" bucket found.');
            console.log('   Public:', productsBucket.public);
        } else {
            console.error('❌ "products" bucket NOT found in list.');
        }
    }

    // Try to list files in 'products' regardless of bucket list permission
    console.log('Listing files in "products"...');
    const { data: files, error: listError } = await supabase.storage.from('products').list();

    if (listError) {
        console.error('Error listing files:', listError.message);
    } else {
        console.log(`✅ Files in "products": ${files.length}`);
        if (files.length > 0) {
            // Check Public URL Generation
            const file = files[0];
            const { data } = supabase.storage.from('products').getPublicUrl(file.name);
            console.log('   Test Public URL:', data.publicUrl);

            // We can't actually curl/fetch here easily without another lib, but the URL structure reveals a lot.
        }
    }
}

checkStorage();
