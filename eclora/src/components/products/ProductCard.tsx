"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishLoading(true);
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (data.success) {
        setWishlisted(data.action === "added");
      }
    } finally {
      setWishLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="glass glass-hover overflow-hidden">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={
                product.images[0] ||
                "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80"
              }
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <button
              onClick={toggleWishlist}
              disabled={wishLoading}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center glass rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-champagne/20"
              aria-label="Add to wishlist"
            >
              <Heart
                size={18}
                className={wishlisted ? "fill-rose text-rose" : "text-ivory"}
              />
            </button>

            {product.stockStatus !== "In Stock" && (
              <span className="absolute top-4 left-4 text-[10px] tracking-wider uppercase bg-midnight/80 text-silver px-3 py-1">
                {product.stockStatus}
              </span>
            )}
          </div>

          <div className="p-5 md:p-6">
            <p className="text-[10px] tracking-[0.2em] uppercase text-champagne/70 mb-2">
              {product.category}
            </p>
            <h3 className="font-display text-lg text-ivory mb-2 group-hover:text-champagne transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-champagne font-light tracking-wide">
                {formatPrice(product.price)}
              </p>
              {product.carat && (
                <p className="text-xs text-silver">{product.carat} ct</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
