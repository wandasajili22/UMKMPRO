/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Users, Award, Heart, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  { label: "Partner UMKM", value: "500+" },
  { label: "Produk Terjual", value: "10rb+" },
  { label: "Kota Terjangkau", value: "25+" },
  { label: "Rating Kepuasan", value: "4.9/5" },
];

const PARTNERS = [
  {
    name: "Kopi Nusantara",
    category: "Minuman",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
    desc: "Suplier biji kopi terbaik dari petani lokal di seluruh Indonesia."
  },
  {
    name: "Tenun Ikat Jaya",
    category: "Kerajinan",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=400",
    desc: "Membawa tradisi tenun tangan ke pasar modern dengan sentuhan kontemporer."
  },
  {
    name: "Keripik Mantap",
    category: "Makanan",
    image: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?auto=format&fit=crop&q=80&w=400",
    desc: "Camilan tradisional dengan rasa inovatif yang disukai ribuan pelanggan."
  },
  {
    name: "Batik Modern Srikandi",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=400",
    desc: "Memberdayakan pengrajin wanita lokal untuk menciptakan busana elegan."
  }
];

export default function About() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 text-center lg:text-left"
          >
            <span className="inline-block rounded-full bg-orange-50 px-4 py-1 text-xs sm:text-sm font-bold text-orange-600">Terpercaya & Berdampak</span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-neutral-900">
              Memberdayakan <span className="text-orange-600">UMKM Lokal</span> Untuk Naik Kelas
            </h1>
            <p className="text-sm sm:text-lg leading-relaxed text-neutral-500">
              UMKM Pro bukan sekadar platform belanja. Kami adalah ekosistem yang menghubungkan talenta lokal terbaik dengan pasar nasional. Misi kami adalah menghadirkan produk berkualitas tinggi sambil menjaga kelestarian budaya dan ekonomi lokal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/products" className="w-full sm:w-auto text-center rounded-full bg-neutral-900 px-8 py-4 font-bold text-white transition-all hover:bg-neutral-800">
                Lihat Produk Kami
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-3xl sm:rounded-[4rem] bg-orange-100 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800" 
                alt="UMKM Collaboration"
                className="h-full w-full object-cover mix-blend-multiply opacity-80"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 rounded-2xl sm:rounded-[2rem] bg-white p-4 sm:p-8 shadow-xl shadow-orange-500/10 max-w-[200px] sm:max-w-none">
              <Award className="mb-2 h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
              <p className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-neutral-400">Award Winning</p>
              <h4 className="text-sm sm:text-xl font-black text-neutral-900">Platform Terbaik 2024</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mb-2 text-4xl font-black text-orange-500">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Mengapa Kami Berbeda?</h2>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {[
            { icon: <Heart className="h-8 w-8" />, title: "Kurasi Ketat", desc: "Setiap produk melalui kontrol kualitas manual untuk memastikan hanya yang terbaik sampai ke tangan Anda." },
            { icon: <Users className="h-8 w-8" />, title: "Dukungan Komunitas", desc: "70% dari keuntungan kami dikembalikan untuk pelatihan dan digitalisasi mitra pengrajin lokal." },
            { icon: <Globe className="h-8 w-8" />, title: "Digitalisasi Global", desc: "Membantu UMKM tradisional menjangkau pasar yang lebih luas melalui teknologi modern." }
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl sm:rounded-[2.5rem] border border-neutral-100 bg-white p-6 sm:p-10 transition-all hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 text-center sm:text-left"
            >
              <div className="mb-6 mx-auto sm:mx-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">{val.icon}</div>
              <h3 className="mb-4 text-xl font-bold">{val.title}</h3>
              <p className="leading-relaxed text-sm sm:text-base text-neutral-500">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio / Partners */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="mb-4 text-4xl font-bold">Portofolio Mitra Utama</h2>
            <p className="text-neutral-500">Inilah beberapa UMKM yang telah bertransformasi dan berkembang pesat bersama ekosistem kami.</p>
          </div>
          <Link to="/products" className="flex items-center gap-2 font-bold text-orange-600 hover:underline">
            Lihat Semua Produk <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-[2.5rem] bg-neutral-100">
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">{partner.category}</span>
              <h3 className="mb-2 text-xl font-bold text-neutral-900">{partner.name}</h3>
              <p className="text-sm leading-relaxed text-neutral-500">{partner.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 text-center lg:text-left">
        <div className="rounded-3xl sm:rounded-[3.5rem] bg-orange-600 p-8 sm:p-12 lg:p-24 text-center text-white shadow-2xl shadow-orange-500/20">
          <h2 className="mb-6 text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">Miliki Produk UMKM <br className="hidden md:block" /> Lokal Berkualitas Sekarang</h2>
          <p className="mx-auto mb-10 max-w-2xl text-sm sm:text-lg text-white/80">
            Setiap pembelian Anda berkontribusi langsung pada kesejahteraan pengrajin lokal dan pertumbuhan ekonomi daerah.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products" className="w-full sm:w-auto rounded-full bg-white px-10 py-4 font-black text-orange-600 transition-all hover:bg-neutral-100 text-center">
              Belanja Sekarang
            </Link>
            <Link to="/contact" className="w-full sm:w-auto rounded-full border-2 border-white/30 px-10 py-4 font-black text-white backdrop-blur-sm transition-all hover:bg-white/10 text-center">
              Menjadi Mitra
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
