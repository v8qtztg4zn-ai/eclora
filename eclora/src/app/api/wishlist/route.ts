import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonResponse, errorResponse } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("eclora_session")?.value;
    if (!sessionId) return jsonResponse([]);

    const items = await prisma.wishlist.findMany({
      where: { sessionId },
      include: { product: true },
    });

    return jsonResponse(items);
  } catch {
    return errorResponse("Failed to fetch wishlist", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId } = body;
    if (!productId) return errorResponse("Product ID required");

    let sessionId = req.cookies.get("eclora_session")?.value;
    const response = jsonResponse({ success: true });

    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      response.cookies.set("eclora_session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    const existing = await prisma.wishlist.findFirst({
      where: { productId, sessionId },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } });
      return jsonResponse({ success: true, action: "removed" });
    }

    await prisma.wishlist.create({
      data: { productId, sessionId },
    });

    return jsonResponse({ success: true, action: "added" });
  } catch {
    return errorResponse("Failed to update wishlist", 500);
  }
}
