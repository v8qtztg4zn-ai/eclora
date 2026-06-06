import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { generateOrderNumber } from "@/lib/utils";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const orders = await prisma.order.findMany({
      where: status ? { status } : undefined,
      include: {
        customer: true,
        items: { include: { product: { select: { name: true, images: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return jsonResponse(orders);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch orders", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, items, customerNotes } = body;

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId,
        totalAmount,
        customerNotes,
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return jsonResponse(order, 201);
  } catch {
    return errorResponse("Failed to create order", 500);
  }
}
