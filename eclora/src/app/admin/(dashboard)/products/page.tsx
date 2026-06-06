```typescriptreact
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Alert, type AlertState } from "@/components/ui/Alert";
import { formatPrice } from "@/lib/utils";
import { CATEGORIES } from "@/lib/validations";
import type { Product } from "@/types";

const emptyProduct = {
  name: "",
  sku: "",
  category: "Engagement Rings",
  description: "",
  price: 0,
  carat: 0,
  cut: "Excellent",
  color: "D",
  clarity: "VVS1",
  metal: "18K White Gold",
  diamondType: "Lab-Grown",
  stockStatus: "In Stock",
  featured: false,
  images: [] as string[],
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    type: "success",
    message: "",
  });

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const data = await res.json();
      setForm((prev) => ({ ...prev, images: [...prev.images, data.url] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/products/${editing}` : "/api/products";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setAlert({ show: true, type: "success", message: editing ? "Product updated" : "Product created" });
      setShowForm(false);
      setEditing(null);
      setForm(emptyProduct);
      fetchProducts();
    } else {
      const data = await res.json();
      setAlert({ show: true, type: "error", message: data.error || "Failed" });
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      description: product.description,
      price: product.price,
      carat: product.carat || 0,
      cut: product.cut || "",
      color: product.color || "",
      clarity: product.clarity || "",
      metal: product.metal || "",
      diamondType: product.diamondType,
      stockStatus: product.stockStatus,
      featured: product.featured,
      images: product.images,
    });
    setEditing(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Alert {...alert} onClose={() => setAlert((p) => ({ ...p, show: false }))} />
      <AdminHeader
        title="Products"
        subtitle={`${products.length} products`}
        action={
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(emptyProduct); }}
            className="btn-primary flex items-center gap-2 text-xs"
          >
            <Plus size={16} /> Add Product
          </button>
        }
      />

      {showForm && (
        <div className="glass p-6 mb-8">
          <h3 className="text-lg text-ivory mb-6">{editing ? "Edit" : "New"} Product</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label-field">Name *</label>
                <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="label-field">SKU *</label>
                <input className="input-field" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required />
              </div>
              <div>
                <label className="label-field">Category</label>
                <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label-field">Description</label>
              <textarea className="input-field resize-none" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="label-field">Price</label>
                <input type="number" className="input-field" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="label-field">Carat</label>
                <input type="number" step="0.01" className="input-field" value={form.carat} onChange={(e) => setForm({ ...form, carat: Number(e.target.value) })} />
              </div>
              <div>
                <label className="label-field">Cut</label>
                <input className="input-field" value={form.cut} onChange={(e) => setForm({ ...form, cut: e.target.value })} />
              </div>
              <div>
                <label className="label-field">Color</label>
                <input className="input-field" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
              </div>
              <div>
                <label className="label-field">Clarity</label>
                <input className="input-field" value={form.clarity} onChange={(e) => setForm({ ...form, clarity: e.target.value })} />
              </div>
              <div>
                <label className="label-field">Metal</label>
                <input className="input-field" value={form.metal} onChange={(e) => setForm({ ...form, metal: e.target.value })} />
              </div>
              <div>
                <label className="label-field">Stock</label>
                <select className="input-field" value={form.stockStatus} onChange={(e) => setForm({ ...form, stockStatus: e.target.value })}>
                  <option>In Stock</option>
                  <option>Made to Order</option>
                  <option>Out of Stock</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm text-silver cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-champagne" />
                  Featured
                </label>
              </div>
            </div>
            <div>
              <label className="label-field">Images</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
              <div className="flex gap-2 mt-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-xs">{editing ? "Update" : "Create"}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="btn-secondary text-xs">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="text-left p-4 text-xs tracking-wider uppercase text-silver">Product</th>
              <th className="text-left p-4 text-xs tracking-wider uppercase text-silver">Category</th>
              <th className="text-left p-4 text-xs tracking-wider uppercase text-silver">Price</th>
              <th className="text-left p-4 text-xs tracking-wider uppercase text-silver">Stock</th>
              <th className="text-right p-4 text-xs tracking-wider uppercase text-silver">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={product.images[0] || "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=100&q=80"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-ivory">{product.name}</p>
                      <p className="text-xs text-silver">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-silver">{product.category}</td>
                <td className="p-4 text-champagne">{formatPrice(product.price)}</td>
                <td className="p-4"><StatusBadge status={product.stockStatus} /></td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(product)} className="text-silver hover:text-champagne p-1"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(product.id)} className="text-silver hover:text-rose p-1 ml-2"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

```
