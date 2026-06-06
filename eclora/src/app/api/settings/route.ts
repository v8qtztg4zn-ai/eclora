import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { settingsSchema } from "@/lib/validations";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: "default" } });
    }

    return jsonResponse(settings);
  } catch {
    return errorResponse("Failed to fetch settings", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message);
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: parsed.data,
      create: { id: "default", ...parsed.data },
    });

    return jsonResponse(settings);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to update settings", 500);
  }
}
