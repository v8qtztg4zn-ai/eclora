"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { CATEGORIES } from "@/lib/validations";
import type { Product } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam || "");

  useEffect(() => {
    setActiveCategory(categoryParam || "");
  }, [categoryParam]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);

    fetch(`/api/products?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="pt-24">
      <section className="section-padding pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
              Shop
            </p>
            <h1 className="heading-display text-ivory mb-6">All Pieces</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("")}
              className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                !activeCategory
                  ? "bg-champagne text-midnight"
                  : "border border-white/10 text-silver hover:border-champagne/30 hover:text-champagne"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-champagne text-midnight"
                    : "border border-white/10 text-silver hover:border-champagne/30 hover:text-champagne"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : products.length === 0 ? (
            <p className="text-center text-silver py-20">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsContent />
    </Suspense>
  );
}
