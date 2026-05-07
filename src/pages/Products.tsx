/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Filter, Search, ChevronDown } from "lucide-react";
import { formatCurrency } from "../lib/utils";
import { motion } from "motion/react";

const PRODUCTS = [
  { id: '1', name: 'Tas Tenun Handmade', price: 250000, category: 'Aksesoris', image: 'https://picsum.photos/seed/tas/500/600', slug: 'tas-tenun-handmade', rating: 4.8 },
  { id: '2', name: 'Kopi Arabika Gayo 250g', price: 85000, category: 'Kuliner', image: 'https://picsum.photos/seed/kopi/500/600', slug: 'kopi-arabika-gayo', rating: 4.9 },
  { id: '3', name: 'Lampu Meja Bambu', price: 175000, category: 'Kriya', image: 'https://picsum.photos/seed/lampu/500/600', slug: 'lampu-meja-bambu', rating: 4.7 },
  { id: '4', name: 'Batik Tulis Solo', price: 450000, category: 'Fashion', image: 'https://picsum.photos/seed/batik/500/600', slug: 'batik-tulis-solo', rating: 5.0 },
  { id: '5', name: 'Madu Hutan Asli', price: 120000, category: 'Kesehatan', image: 'https://picsum.photos/seed/honey/500/600', slug: 'madu-hutan-asli', rating: 4.8 },
  { id: '6', name: 'Keripik Tempe Premium', price: 25000, category: 'Kuliner', image: 'https://picsum.photos/seed/tempeh/500/600', slug: 'keripik-tempe-premium', rating: 4.6 },
  { id: '7', name: 'Gantungan Kunci Kayu', price: 15000, category: 'Kriya', image: 'https://picsum.photos/seed/woodcraft/500/600', slug: 'gantungan-kunci-kayu', rating: 4.5 },
  { id: '8', name: 'Totebag Kanvas Lukis', price: 65000, category: 'Fashion', image: 'https://picsum.photos/seed/bag/500/600', slug: 'totebag-kanvas-lukis', rating: 4.7 },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = PRODUCTS.filter(p => 
    (selectedCategory === "Semua" || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header & Search */}
      <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">Semua Produk</h1>
          <p className="text-sm sm:text-base text-neutral-500">Temukan keberagaman produk UMKM lokal terbaik.</p>
        </div>
        
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-12 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <select
              className="w-full appearance-none rounded-2xl border border-neutral-200 bg-white py-3 pl-12 pr-10 text-sm focus:border-orange-500 focus:outline-none md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:gap-8 grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
            className="group space-y-4"
          >
            <Link to={`/product/${product.slug}`} className="block overflow-hidden rounded-[2rem] bg-neutral-100">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="space-y-1 px-1 sm:px-2">
              <div className="flex items-center justify-between">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400">{product.category}</p>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-yellow-500">
                  <Star className="h-3 w-3 fill-current" /> {product.rating}
                </div>
              </div>
              <Link to={`/product/${product.slug}`} className="block text-sm sm:text-lg font-bold text-neutral-900 hover:text-orange-600 transition-colors line-clamp-1">
                {product.name}
              </Link>
              <p className="text-base sm:text-xl font-black text-orange-600">{formatCurrency(product.price)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-bold text-neutral-500">Tidak ada produk yang sesuai dengan pencarian kamu.</p>
        </div>
      )}
    </div>
  );
}
