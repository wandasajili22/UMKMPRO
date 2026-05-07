/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Shirt, Coffee, Palmtree, Leaf, Home, Gift } from "lucide-react";

const CATEGORIES = [
  { name: 'Fashion', icon: <Shirt />, count: '120+ Produk', image: 'https://picsum.photos/seed/fashion/400/500', slug: 'fashion' },
  { name: 'Kuliner', icon: <Coffee />, count: '80+ Produk', image: 'https://picsum.photos/seed/culinary/400/500', slug: 'kuliner' },
  { name: 'Kriya', icon: <Palmtree />, count: '50+ Produk', image: 'https://picsum.photos/seed/craft/400/500', slug: 'kriya' },
  { name: 'Kesehatan', icon: <Leaf />, count: '40+ Produk', image: 'https://picsum.photos/seed/health/400/500', slug: 'kesehatan' },
  { name: 'Dekorasi', icon: <Home />, count: '35+ Produk', image: 'https://picsum.photos/seed/decor/400/500', slug: 'dekorasi' },
  { name: 'Aksesoris', icon: <Gift />, count: '90+ Produk', image: 'https://picsum.photos/seed/gift/400/500', slug: 'aksesoris' },
];

export default function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mb-10 sm:mb-12 space-y-2 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">Kategori Produk</h1>
        <p className="text-sm sm:text-base text-neutral-500">Pilih kategori yang sesuai dengan kebutuhan Anda.</p>
      </div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.1 }}
            className="group relative h-72 sm:h-80 overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-neutral-900"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 text-white">
              <div className="mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-orange-600">
                {cat.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">{cat.name}</h3>
              <p className="mt-1 text-xs sm:text-sm font-medium opacity-80">{cat.count}</p>
              
              <Link
                to={`/products?category=${cat.slug}`}
                className="mt-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all hover:bg-white hover:text-black"
              >
                <motion.span whileHover={{ x: 5 }} className="text-lg sm:text-xl">→</motion.span>
              </Link>
            </div>
            
            {/* Overlay link for accessibility */}
            <Link to={`/products?category=${cat.slug}`} className="absolute inset-0 z-10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
