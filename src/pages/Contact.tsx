/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram, Music2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend/email service
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">Hubungi Kami</h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-neutral-500">
          Punya pertanyaan tentang produk kami atau ingin menjadi mitra UMKM Pro? 
          Tim kami siap membantu Anda.
        </p>
      </div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="h-full">
          <div className="h-full rounded-3xl sm:rounded-[2.5rem] bg-orange-600 p-6 sm:p-10 text-white shadow-xl shadow-orange-500/20">
            <h2 className="mb-8 text-xl sm:text-2xl font-bold">Informasi Kontak</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Alamat Kantor</h4>
                  <p className="text-sm opacity-80">Jl. Digital No. 123, Kuningan, Jakarta Selatan, 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Telepon / WhatsApp</h4>
                  <p className="text-sm opacity-80">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-sm opacity-80">halo@umkmpro.id</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Instagram className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Instagram</h4>
                  <p className="text-sm opacity-80">@umkmpro.official</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Music2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">TikTok</h4>
                  <p className="text-sm opacity-80">@umkmpro.official</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white font-bold text-orange-600 transition-all hover:bg-neutral-100">
                <MessageCircle className="h-5 w-5" /> Chat via WA
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="h-full rounded-3xl sm:rounded-[2.5rem] border border-neutral-100 bg-white p-6 sm:p-10 shadow-sm">
          <h2 className="mb-6 text-xl sm:text-2xl font-bold text-neutral-900">Kirim Pesan</h2>
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-[400px] flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Send className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">Pesan Terkirim!</h3>
              <p className="text-neutral-500">Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda melalui email.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Nama</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm focus:border-orange-500 focus:outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm focus:border-orange-500 focus:outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Subjek</label>
                <input
                  type="text"
                  required
                  placeholder="Apa yang ingin Anda tanyakan?"
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm focus:border-orange-500 focus:outline-none"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Pesan</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm focus:border-orange-500 focus:outline-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 py-4 font-bold text-white transition-all hover:bg-neutral-800"
              >
                Kirim Sekarang <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Jam Operasional - Separate Section */}
      <div className="mt-8 sm:mt-12">
        <div className="rounded-3xl sm:rounded-[2.5rem] border border-neutral-100 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg sm:text-xl font-bold text-neutral-900">Jam Operasional Kantor</h3>
              <p className="text-neutral-500 text-sm">Tim kami siap membantu Anda selama jam kerja berikut. Silakan hubungi kami melalui platform yang tersedia.</p>
            </div>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li className="flex justify-between border-b border-neutral-50 pb-2"><span>Senin - Jumat:</span> <span className="font-bold text-neutral-900">09:00 - 18:00</span></li>
              <li className="flex justify-between border-b border-neutral-50 pb-2"><span>Sabtu:</span> <span className="font-bold text-neutral-900">10:00 - 15:00</span></li>
              <li className="flex justify-between pt-1"><span>Minggu:</span> <span className="font-bold text-red-500">Tutup</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-8 sm:mt-12">
        <div className="overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-neutral-100 bg-white shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 p-6 sm:p-10 border-b border-neutral-50 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Lokasi Kami</h3>
              <p className="text-neutral-500 text-sm mt-2">Kunjungi kantor kami untuk konsultasi langsung atau kemitraan strategis.</p>
            </div>
            <a 
              href="https://maps.app.goo.gl/Qy28C4A9shPjKdWU9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-orange-50 px-6 py-3 text-sm font-bold text-orange-600 transition-all hover:bg-orange-100"
            >
              <MapPin className="h-4 w-4" /> Buka di Google Maps
            </a>
          </div>
          
          <div className="h-[400px] w-full relative">
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              allowFullScreen 
              referrerPolicy="no-referrer-when-downgrade" 
              src="https://maps.google.com/maps?q=-6.2238,106.8277&z=15&output=embed"
              className="grayscale-[0.2] contrast-[1.1]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
