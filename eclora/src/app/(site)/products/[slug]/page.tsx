"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);

        if (data.category) {
          fetch(`/api/products?category=${encodeURIComponent(data.category)}`)
            .then((res) => res.json())
            .then((items: Product[]) => {
              setSimilar(items.filter((p) => p.id !== data.id).slice(0, 4));
            });
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner className="min-h-screen pt-24" />;
  if (!product)
    return (
      <div className="min-h-screen pt-24 text-center text-silver">
        Product not found
      </div>
    );

  const specs = [
    { label: "Diamond Type", value: product.diamondType },
    { label: "Carat", value: product.carat ? `${product.carat} ct` : null },
    { label: "Cut", value: product.cut },
    { label: "Color", value: product.color },
    { label: "Clarity", value: product.clarity },
    { label: "Metal", value: product.metal },
    { label: "SKU", value: product.sku },
    { label: "Availability", value: product.stockStatus },
  ].filter((s) => s.value);

  const images =
    product.images.length > 0
      ? product.images
      : [
          "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
        ];

  return (
    <div className="pt-24">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-silver hover:text-champagne mb-8 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square overflow-hidden glass mb-4">
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-20 overflow-hidden border transition-all ${
                        activeImage === i
                          ? "border-champagne"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-champagne mb-3">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl text-ivory mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-champagne font-light mb-8">
                {formatPrice(product.price)}
              </p>

              <p className="text-silver leading-relaxed mb-10 font-light">
                {product.description}
              </p>

              <div className="glass p-6 mb-10">
                <h3 className="text-xs tracking-[0.2em] uppercase text-champagne mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="text-[10px] tracking-wider uppercase text-silver/60 mb-1">
                        {spec.label}
                      </p>
                      <p className="text-sm text-ivory">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  variant="primary"
                  onClick={() => setShowInquiry(!showInquiry)}
                >
                  Send Inquiry
                </Button>
                <Button href="/contact" variant="secondary">
                  Book Appointment
                </Button>
                <Button href="/custom-jewelry" variant="ghost">
                  Request Custom Design
                </Button>
              </div>

              {showInquiry && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="glass p-6 mt-6"
                >
                  <InquiryForm
                    type="product"
                    productId={product.id}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>

          {similar.length > 0 && (
            <div className="mt-24">
              <h2 className="heading-section text-ivory mb-12 text-center">
                You May Also Love
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similar.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
