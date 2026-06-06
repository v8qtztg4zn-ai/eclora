import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { jsonResponse, errorResponse } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return errorResponse("No file provided");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse("Invalid file type. Allowed: JPEG, PNG, WebP");
    }

    if (file.size > 5 * 1024 * 1024) {
      return errorResponse("File too large. Max 5MB");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "inquiries");
    await mkdir(uploadDir, { recursive: true });

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    return jsonResponse({ url: `/uploads/inquiries/${filename}` });
  } catch {
    return errorResponse("Upload failed", 500);
  }
}
