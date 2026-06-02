import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAllPosts, createPost } from '@/lib/blog-data';

function getAuthEmail(request: NextRequest): string | null {
  const token = request.cookies.get('wnp-admin-token')?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.email ?? null;
}

export async function GET(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, tags, coverImage } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, slug, excerpt, and content are required' },
        { status: 400 }
      );
    }

    const post = createPost({
      title,
      slug,
      excerpt,
      content,
      author: 'Wellness Nurse Pro',
      coverImage: coverImage || undefined,
      tags: tags || [],
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
