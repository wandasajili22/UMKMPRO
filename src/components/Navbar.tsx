import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { motion } from "motion/react";

export default function Navbar() {
  const { user, profile, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold tracking-tight text-neutral-900">
              UMKM<span className="text-orange-600">PRO</span>
            </Link>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link to="/products" className="text-neutral-600 hover:text-neutral-900">Produk</Link>
                <Link to="/categories" className="text-neutral-600 hover:text-neutral-900">Kategori</Link>
                <Link to="/about" className="text-neutral-600 hover:text-neutral-900">Tentang</Link>
                <Link to="/contact" className="text-neutral-600 hover:text-neutral-900">Kontak</Link>
                {isAdmin && <Link to="/admin" className="font-semibold text-orange-600">Admin</Link>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/cart" className="relative p-2 text-neutral-600 hover:text-neutral-900">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">{itemCount}</span>}
            </Link>
            {user ? (
              <div className="group relative">
                <button className="flex items-center gap-2 p-2 text-neutral-600 hover:text-neutral-900">
                  {profile?.photoURL ? <img src={profile.photoURL} alt="User" className="h-8 w-8 rounded-full" /> : <User className="h-6 w-6" />}
                </button>
                <div className="invisible absolute right-0 mt-2 w-48 rounded-xl border bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <Link to="/profile" className="block rounded-lg px-4 py-2 text-sm hover:bg-neutral-50">Profil</Link>
                  <Link to="/orders" className="block rounded-lg px-4 py-2 text-sm hover:bg-neutral-50">Pesanan</Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50">Keluar</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">Masuk</Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-neutral-600 hover:text-neutral-900 md:hidden">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t bg-white md:hidden overflow-hidden shadow-xl"
        >
          <div className="space-y-4 px-6 pb-8 pt-6">
            <div className="space-y-1">
              <Link to="/products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-neutral-600 hover:bg-orange-50 hover:text-orange-600 transition-all">
                Produk
              </Link>
              <Link to="/categories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-neutral-600 hover:bg-orange-50 hover:text-orange-600 transition-all">
                Kategori
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-neutral-600 hover:bg-orange-50 hover:text-orange-600 transition-all">
                Tentang Kami
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-neutral-600 hover:bg-orange-50 hover:text-orange-600 transition-all">
                Kontak
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-orange-600 hover:bg-orange-50 transition-all">
                  Admin Panel
                </Link>
              )}
            </div>
            
            <div className="border-t pt-4">
              {user ? (
                <div className="space-y-1">
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
                    Profil Saya
                  </Link>
                  <Link to="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-neutral-600 hover:bg-neutral-50 transition-all">
                    Pesanan Saya
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-red-600 hover:bg-red-50 transition-all">
                    Keluar
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex w-full items-center justify-center rounded-2xl bg-neutral-900 py-4 font-bold text-white transition-all hover:bg-neutral-800">
                  Masuk Sekarang
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
