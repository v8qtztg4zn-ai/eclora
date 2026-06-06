import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { appointmentSchema } from "@/lib/validations";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const appointments = await prisma.appointment.findMany({
      where: status ? { status } : undefined,
      include: { customer: true },
      orderBy: { date: "asc" },
    });

    return jsonResponse(appointments);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch appointments", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = appointmentSchema.safeParse(body);
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

    const appointment = await prisma.appointment.create({
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
        customerId: customer.id,
      },
    });

    return jsonResponse(appointment, 201);
  } catch {
    return errorResponse("Failed to book appointment", 500);
  }
}
