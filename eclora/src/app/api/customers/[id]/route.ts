import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        inquiries: { orderBy: { createdAt: "desc" } },
        orders: { include: { items: { include: { product: true } } } },
        wishlists: { include: { product: true } },
      },
    });
    if (!customer) return errorResponse("Customer not found", 404);
    return jsonResponse(customer);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch customer", 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    const customer = await prisma.customer.update({
      where: { id },
      data: { notes: body.notes },
    });

    return jsonResponse(customer);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to update customer", 500);
  }
}
