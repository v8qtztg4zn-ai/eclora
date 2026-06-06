import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { inquirySchema } from "@/lib/validations";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return jsonResponse(inquiries);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch inquiries", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message);
    }

    let customer = await prisma.customer.findUnique({
      where: { email: parsed.data.email },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
        },
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: { ...parsed.data, customerId: customer.id },
    });

    return jsonResponse(inquiry, 201);
  } catch {
    return errorResponse("Failed to submit inquiry", 500);
  }
}
