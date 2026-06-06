import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { jsonResponse, errorResponse, unauthorizedResponse } from "@/lib/api-helpers";

export async function GET() {
  try {
    await requireAdmin();

    const [
      totalOrders,
      totalInquiries,
      pendingInquiries,
      revenueResult,
      recentInquiries,
      recentOrders,
      recentAppointments,
      categoryGroups,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "New" } }),
      prisma.order.aggregate({
        where: { status: { not: "Cancelled" } },
        _sum: { totalAmount: true },
      }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, type: true, status: true, createdAt: true },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { customer: { select: { name: true } } },
      }),
      prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, purpose: true, status: true, createdAt: true },
      }),
      prisma.product.groupBy({
        by: ["category"],
        _count: { category: true },
        orderBy: { _count: { category: "desc" } },
        take: 5,
      }),
    ]);

    const now = new Date();
    const monthlySales: { month: string; sales: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const monthLabel = date.toLocaleString("en-US", { month: "short" });

      const salesSum = await prisma.order.aggregate({
        where: {
          createdAt: { gte: date, lt: nextMonth },
          status: { not: "Cancelled" },
        },
        _sum: { totalAmount: true },
      });

      monthlySales.push({
        month: monthLabel,
        sales: salesSum._sum.totalAmount || 0,
      });
    }

    const recentActivity = [
      ...recentInquiries.map((i) => ({
        id: i.id,
        type: "inquiry" as const,
        title: i.name,
        subtitle: i.type,
        date: i.createdAt.toISOString(),
        status: i.status,
      })),
      ...recentOrders.map((o) => ({
        id: o.id,
        type: "order" as const,
        title: o.customer.name,
        subtitle: o.orderNumber,
        date: o.createdAt.toISOString(),
        status: o.status,
      })),
      ...recentAppointments.map((a) => ({
        id: a.id,
        type: "appointment" as const,
        title: a.name,
        subtitle: a.purpose,
        date: a.createdAt.toISOString(),
        status: a.status,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return jsonResponse({
      totalOrders,
      totalInquiries,
      pendingInquiries,
      revenue: revenueResult._sum.totalAmount || 0,
      monthlySales,
      popularCategories: categoryGroups.map((g) => ({
        category: g.category,
        count: g._count.category,
      })),
      recentActivity,
    });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return unauthorizedResponse();
    }
    return errorResponse("Failed to fetch dashboard data", 500);
  }
}
