import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "eclora-dev-secret-change-in-production"
);

const COOKIE_NAME = "eclora_admin_token";

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAdmin(): Promise<AdminPayload> {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export { COOKIE_NAME };

export async function ensureDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@eclora.com";
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (!existing) {
    const password = process.env.ADMIN_PASSWORD || "EcloraAdmin2024!";
    await prisma.admin.create({
      data: {
        email,
        password: await hashPassword(password),
        name: "ECLORA Admin",
      },
    });
  }
}
