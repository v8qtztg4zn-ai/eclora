import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createToken,
  verifyPassword,
  COOKIE_NAME,
  ensureDefaultAdmin,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { jsonResponse, errorResponse } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    await ensureDefaultAdmin();
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message);
    }

    const { email, password } = parsed.data;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await verifyPassword(password, admin.password))) {
      return errorResponse("Invalid email or password", 401);
    }

    const token = await createToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    });

    const response = jsonResponse({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return errorResponse("Login failed", 500);
  }
}
