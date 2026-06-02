import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { updatePost, deletePost, getPostById } from '@/lib/blog-data';

function getAuthEmail(request: NextRequest): string | null {
  const token = request.cookies.get('wnp-admin-token')?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.email ?? null;
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const post = getPostById(id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const updated = updatePost(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: updated });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = deletePost(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
