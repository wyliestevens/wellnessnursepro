import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('wnp-admin-token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    email: decoded.email,
  });
}
