
import { createClient } from '@/lib/supabase/server';
import ShopClient from './client';

export const metadata = {
    title: 'Shop | LuxeHair',
    description: 'Explore our premium hair care products.',
};

export default async function ShopPage() {
    const supabase = await createClient();
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

    return <ShopClient products={products || []} />;
}
