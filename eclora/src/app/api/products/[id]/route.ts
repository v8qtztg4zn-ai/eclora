import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productSchema } from "@/lib/validations";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const product = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!product) return errorResponse("Product not found", 404);

    await prisma.product.update({
      where: { id: product.id },
      data: { views: { increment: 1 } },
    });

    return jsonResponse(product);
  } catch {
    return errorResponse("Failed to fetch product", 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const parsed = productSchema.partial().safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message);
    }

    const product = await prisma.product.update({
      where: { id },
      data: parsed.data,
    });

    return jsonResponse(product);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to update product", 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return jsonResponse({ success: true });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to delete product", 500);
  }
}
