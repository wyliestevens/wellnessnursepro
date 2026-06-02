import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { put } from '@vercel/blob';

function getAuthEmail(request: NextRequest): string | null {
  const token = request.cookies.get('wnp-admin-token')?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.email ?? null;
}

export async function POST(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const blob = await put(`uploads/${file.name}`, file, { access: 'public' });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
