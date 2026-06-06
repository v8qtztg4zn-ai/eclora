import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET() {
  try {
    await requireAdmin();

    const now = new Date();
    const months: { month: string; inquiries: number; sales: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const monthLabel = date.toLocaleString("en-US", { month: "short" });

      const [inquiryCount, salesSum] = await Promise.all([
        prisma.inquiry.count({
          where: { createdAt: { gte: date, lt: nextMonth } },
        }),
        prisma.order.aggregate({
          where: {
            createdAt: { gte: date, lt: nextMonth },
            status: { not: "Cancelled" },
          },
          _sum: { totalAmount: true },
        }),
      ]);

      months.push({
        month: monthLabel,
        inquiries: inquiryCount,
        sales: salesSum._sum.totalAmount || 0,
      });
    }

    const products = await prisma.product.findMany({
      orderBy: { views: "desc" },
      take: 5,
      select: { name: true, views: true, category: true },
    });

    const categoryGroups = await prisma.product.groupBy({
      by: ["category"],
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
    });

    const [totalInquiries, convertedInquiries] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "Converted" } }),
    ]);

    const conversionRate =
      totalInquiries > 0
        ? Math.round((convertedInquiries / totalInquiries) * 100)
        : 0;

    return jsonResponse({
      monthlyData: months,
      topProducts: products,
      topCategories: categoryGroups.map((g) => ({
        category: g.category,
        count: g._count.category,
      })),
      conversionRate,
    });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch analytics", 500);
  }
}
