import { getAllPages } from '@/lib/page-data';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pages = await getAllPages();
  const navPages = pages
    .filter((p) => p.published && p.showInNav)
    .sort((a, b) => (a.navOrder ?? 99) - (b.navOrder ?? 99))
    .map((p) => ({ title: p.title, slug: p.slug }));
  return NextResponse.json(navPages);
}
