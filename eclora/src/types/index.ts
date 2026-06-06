export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  carat: number | null;
  cut: string | null;
  color: string | null;
  clarity: string | null;
  metal: string | null;
  diamondType: string;
  stockStatus: string;
  featured: boolean;
  images: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  jewelryType: string | null;
  budget: string | null;
  diamondSize: string | null;
  metalPreference: string | null;
  message: string | null;
  referenceImage: string | null;
  productId: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalInquiries: number;
  pendingInquiries: number;
  revenue: number;
  monthlySales: { month: string; sales: number }[];
  popularCategories: { category: string; count: number }[];
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: "inquiry" | "order" | "appointment";
  title: string;
  subtitle: string;
  date: string;
  status: string;
}
