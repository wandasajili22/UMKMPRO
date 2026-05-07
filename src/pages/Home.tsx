import { motion } from "motion/react";
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../lib/utils";

const FEATURED_PRODUCTS = [
  { id: '1', name: 'Tas Tenun Handmade', price: 250000, category: 'Aksesoris', image: 'https://picsum.photos/seed/tas/400/500', slug: 'tas-tenun-handmade' },
  { id: '2', name: 'Kopi Arabika Gayo 250g', price: 85000, category: 'Makanan & Minuman', image: 'https://picsum.photos/seed/kopi/400/500', slug: 'kopi-arabika-gayo' },
  { id: '3', name: 'Lampu Meja Bambu', price: 175000, category: 'Dekorasi', image: 'https://picsum.photos/seed/lampu/400/500', slug: 'lampu-meja-bambu' },
  { id: '4', name: 'Batik Tulis Solo', price: 450000, category: 'Fashion', image: 'https://picsum.photos/seed/batik/400/500', slug: 'batik-tulis-solo' },
];

const CATEGORIES = [
  { name: 'Fashion', icon: '👕', count: '120+ Produk' },
  { name: 'Kuliner', icon: '☕', count: '80+ Produk' },
  { name: 'Kriya', icon: '🏺', count: '50+ Produk' },
  { name: 'Kesehatan', icon: '🌿', count: '40+ Produk' },
];

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <section className="relative min-h-[60vh] sm:h-[80vh] w-full overflow-hidden bg-neutral-900 flex items-center">
        <img src="https://picsum.photos/seed/ecommerce/1920/1080" alt="Hero" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-2xl space-y-4 sm:space-y-6 text-center sm:text-left px-4 sm:px-0"
            >
              <span className="inline-block rounded-full bg-orange-600 px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-bold uppercase text-white">Produk Lokal Berkualitas</span>
              <h1 className="text-3xl font-bold text-white sm:text-7xl leading-tight">Bawa Produk UMKM Kamu <span className="text-orange-500">Go Digital</span></h1>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start pt-2 sm:pt-4">
                <Link to="/products" className="w-full sm:w-auto rounded-full bg-white px-8 py-3 sm:py-4 font-bold text-sm sm:text-base text-neutral-900 hover:bg-orange-600 hover:text-white transition-all text-center">Belanja Sekarang</Link>
                <Link to="/about" className="w-full sm:w-auto rounded-full border border-white/30 backdrop-blur-md px-8 py-3 sm:py-4 font-bold text-sm sm:text-base text-white hover:bg-white hover:text-neutral-900 transition-all text-center">Tentang Kami</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-8 border-b border-neutral-200 pb-20 grid-cols-2 md:grid-cols-4"
        >
          {[
            { icon: <ShoppingBag />, title: 'Kualitas', desc: 'Produk kurasi' },
            { icon: <Truck />, title: 'Cepat', desc: 'Kurir handal' },
            { icon: <ShieldCheck />, title: 'Aman', desc: 'Terenkripsi' },
            { icon: <Zap />, title: 'Terpercaya', desc: 'Verifikasi' },
          ].map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">{f.icon}</div>
              <div><h3 className="font-bold text-sm sm:text-base">{f.title}</h3><p className="hidden sm:block text-xs text-neutral-500">{f.desc}</p></div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8 sm:mb-10 px-2 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">Jelajahi Kategori</h2>
          <Link to="/categories" className="text-xs sm:text-sm font-bold text-orange-600 hover:underline">Lihat Semua</Link>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 px-2 sm:px-0">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/products?category=${cat.name}`}
                className="block rounded-3xl border border-neutral-100 bg-white p-6 sm:p-8 hover:shadow-xl transition-all cursor-pointer group text-center sm:text-left"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transition-transform group-hover:scale-110">{cat.icon}</div>
                <h3 className="text-base sm:text-lg font-bold group-hover:text-orange-600 transition-colors">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-500">{cat.count}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Produk Unggulan
        </motion.h2>
        <div className="grid gap-4 sm:gap-8 grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((p, i) => (
            <motion.div 
              key={p.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group space-y-3 sm:space-y-4"
            >
              <Link to={`/product/${p.slug}`} className="block overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100">
                <img src={p.image} alt={p.name} className="aspect-[4/5] w-full object-cover transition-transform group-hover:scale-110" />
              </Link>
              <div className="space-y-1 px-1 sm:px-0">
                <p className="text-[10px] sm:text-xs font-bold uppercase text-neutral-400">{p.category}</p>
                <Link to={`/product/${p.slug}`} className="block text-sm sm:text-lg font-bold hover:text-orange-600 line-clamp-1">{p.name}</Link>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <p className="text-base sm:text-xl font-black text-orange-600">{formatCurrency(p.price)}</p>
                  <div className="flex items-center gap-1 text-[10px] sm:text-sm font-bold text-yellow-500"><Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" /> 4.8</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
