import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET() {
  try {
    await requireAdmin();
    const customers = await prisma.customer.findMany({
      include: {
        _count: { select: { inquiries: true, orders: true, wishlists: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return jsonResponse(customers);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch customers", 500);
  }
}
