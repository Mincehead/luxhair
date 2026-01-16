
import { createClient } from '@/lib/supabase/server';

export async function checkTables() {
    const supabase = await createClient();
    const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });

    if (error) {
        console.error('Error accessing products table:', error);
        return false;
    }

    console.log('Products table exists and is accessible.');
    return true;
}
