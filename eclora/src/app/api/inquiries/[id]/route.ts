import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { product: true, customer: true },
    });
    if (!inquiry) return errorResponse("Inquiry not found", 404);
    return jsonResponse(inquiry);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch inquiry", 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status: body.status,
        adminNotes: body.adminNotes,
      },
    });

    return jsonResponse(inquiry);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to update inquiry", 500);
  }
}
