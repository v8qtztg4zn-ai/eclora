import { getAdminSession } from "@/lib/auth";
import { jsonResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return unauthorizedResponse();
  return jsonResponse({ admin: session });
}
