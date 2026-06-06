import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  carat: z.number().optional().nullable(),
  cut: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  clarity: z.string().optional().nullable(),
  metal: z.string().optional().nullable(),
  diamondType: z.string().default("Lab-Grown"),
  stockStatus: z.string().default("In Stock"),
  featured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
});

export const inquirySchema = z.object({
  type: z.string().default("general"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  jewelryType: z.string().optional(),
  budget: z.string().optional(),
  diamondSize: z.string().optional(),
  metalPreference: z.string().optional(),
  message: z.string().optional(),
  referenceImage: z.string().optional(),
  productId: z.string().optional(),
});

export const appointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  purpose: z.string().min(1, "Purpose is required"),
  notes: z.string().optional(),
});

export const orderSchema = z.object({
  customerId: z.string().min(1),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1),
  customerNotes: z.string().optional(),
});

export const settingsSchema = z.object({
  brandName: z.string().optional(),
  tagline: z.string().optional(),
  heroText: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  email: z.string().optional(),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  pinterest: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
});

export const CATEGORIES = [
  "Engagement Rings",
  "Diamond Pendants",
  "Tennis Bracelets",
  "Earrings",
  "Custom Jewelry",
] as const;

export const INQUIRY_STATUSES = ["New", "Contacted", "Converted", "Closed"] as const;
export const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "In Production",
  "Ready",
  "Delivered",
  "Cancelled",
] as const;
export const APPOINTMENT_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;
