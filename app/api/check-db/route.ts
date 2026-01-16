
import { NextResponse } from 'next/server';
import { checkTables } from '@/lib/check-db';

export async function GET() {
    const exists = await checkTables();
    return NextResponse.json({ exists });
}
