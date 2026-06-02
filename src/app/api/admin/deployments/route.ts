import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

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

  const vercelToken = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!vercelToken || !projectId) {
    return NextResponse.json(
      { error: 'Vercel configuration missing' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch deployments' },
        { status: res.status }
      );
    }

    const data = await res.json();

    const deployments = data.deployments.map(
      (d: {
        uid: string;
        url: string;
        created: number;
        state: string;
        target: string | null;
        readyState: string;
      }) => ({
        id: d.uid,
        url: d.url,
        createdAt: new Date(d.created).toISOString(),
        state: d.readyState || d.state,
        isProduction: d.target === 'production',
      })
    );

    return NextResponse.json({ deployments });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch deployments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vercelToken = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!vercelToken || !projectId) {
    return NextResponse.json(
      { error: 'Vercel configuration missing' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { deploymentId } = body;

    if (!deploymentId) {
      return NextResponse.json(
        { error: 'deploymentId is required' },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/promote/${deploymentId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: 'Failed to promote deployment', details: errorData },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, deploymentId });
  } catch {
    return NextResponse.json(
      { error: 'Failed to promote deployment' },
      { status: 500 }
    );
  }
}
