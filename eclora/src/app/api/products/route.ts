import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { productSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const products = await prisma.product.findMany({
      where: {
        ...(category && { category }),
        ...(featured === "true" && { featured: true }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { category: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
    });

    return jsonResponse(products);
  } catch {
    return errorResponse("Failed to fetch products", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message);
    }

    const slug = slugify(parsed.data.name);
    const existing = await prisma.product.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const product = await prisma.product.create({
      data: { ...parsed.data, slug: finalSlug },
    });

    return jsonResponse(product, 201);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to create product", 500);
  }
}
