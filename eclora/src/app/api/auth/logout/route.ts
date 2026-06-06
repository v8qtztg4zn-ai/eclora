import { COOKIE_NAME } from "@/lib/auth";
import { jsonResponse } from "@/lib/api-helpers";

export async function POST() {
  const response = jsonResponse({ success: true });
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
