import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });
    if (!order) return errorResponse("Order not found", 404);
    return jsonResponse(order);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch order", 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: body.status,
        paymentStatus: body.paymentStatus,
        deliveryDate: body.deliveryDate ? new Date(body.deliveryDate) : undefined,
        adminNotes: body.adminNotes,
      },
    });

    return jsonResponse(order);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to update order", 500);
  }
}
