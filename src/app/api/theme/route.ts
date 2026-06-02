import { getTheme } from '@/lib/theme-data';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const theme = await getTheme();
  return NextResponse.json({ theme });
}
