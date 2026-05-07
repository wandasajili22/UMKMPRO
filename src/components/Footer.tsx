import { Link } from "react-router-dom";
import { Instagram, Music2, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-neutral-950 pt-16 pb-8 text-neutral-400 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 text-center sm:text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white font-display">UMKM<span className="text-orange-600">PRO</span></Link>
            <p className="max-w-xs mx-auto sm:mx-0 text-sm leading-relaxed">Platform pemberdayaan produk lokal UMKM Indonesia melalui solusi digital modern.</p>
            <div className="flex justify-center sm:justify-start gap-4">
              <a href="https://instagram.com/umkmpro.official" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/5 p-2 text-neutral-400 hover:text-white transition-all hover:bg-white/10" title="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://tiktok.com/@umkmpro.official" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/5 p-2 text-neutral-400 hover:text-white transition-all hover:bg-white/10" title="TikTok"><Music2 className="h-5 w-5" /></a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Menu Utama</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="hover:text-orange-500 transition-colors">Semua Produk</Link></li>
              <li><Link to="/categories" className="hover:text-orange-500 transition-colors">Kategori Produk</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Dukungan</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Kontak Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span>halo@umkmpro.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-neutral-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 UMKM Pro. All rights reserved.</p>
          <p>Dibuat dengan ❤️ untuk UMKM Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
