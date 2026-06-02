import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'wnp-jwt-s3cr3t-k3y-2026-ch4ng3-m3-l4t3r';

type AdminUser = {
  email: string;
  passwordHash: string;
};

// Pre-hash passwords at module load
const adminUsers: AdminUser[] = [
  {
    email: 'dbstevens04@hotmail.com',
    passwordHash: bcrypt.hashSync('Password', 10),
  },
  {
    email: 'wylie@aipeakbiz.com',
    passwordHash: bcrypt.hashSync('Password', 10),
  },
];

export async function verifyCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const user = adminUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return false;
  return bcrypt.compare(password, user.passwordHash);
}

export function generateToken(email: string): string {
  return jwt.sign({ email, role: 'admin' }, JWT_SECRET, {
    expiresIn: '24h',
  });
}

export function verifyToken(token: string): { email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      email: string;
      role: string;
    };
    return decoded;
  } catch {
    return null;
  }
}
