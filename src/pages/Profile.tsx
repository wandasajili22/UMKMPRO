/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Shield, Calendar, LogOut, Camera } from "lucide-react";
import { motion } from "motion/react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Silakan masuk untuk melihat profil</h2>
        <button 
          onClick={() => navigate("/login")}
          className="rounded-full bg-orange-600 px-6 py-2 font-bold text-white hover:bg-orange-700"
        >
          Masuk Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">Profil Saya</h1>
        <p className="text-sm sm:text-base text-neutral-500">Kelola informasi akun dan preferensi Anda.</p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-3xl sm:rounded-[2.5rem] border border-neutral-100 bg-white p-6 sm:p-8 text-center shadow-sm">
            <div className="relative mx-auto mb-4 h-24 w-24 sm:h-32 sm:w-32">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt={profile.displayName || ""} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <User className="h-12 w-12 sm:h-16 sm:w-16" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg transition-transform hover:scale-110">
                <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">{profile?.displayName || "Pengguna"}</h3>
            <p className="text-xs sm:text-sm font-medium text-neutral-400">{profile?.role === "admin" ? "Administrator" : "Pelanggan"}</p>
            
            <button
              onClick={handleLogout}
              className="mt-6 sm:mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl sm:rounded-[2.5rem] border border-neutral-100 bg-white p-6 sm:p-10 shadow-sm"
          >
            <h2 className="mb-8 text-xl sm:text-2xl font-bold text-neutral-900">Detail Akun</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-400">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Nama Lengkap</label>
                  <p className="font-bold text-neutral-900">{profile?.displayName || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Email</label>
                  <p className="font-bold text-neutral-900">{profile?.email || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-400">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Peran Akun</label>
                  <p className="font-bold capitalize text-neutral-900">{profile?.role || "Pelanggan"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-400">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Bergabung Sejak</label>
                  <p className="font-bold text-neutral-900">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-10 rounded-2xl bg-neutral-900 px-8 py-4 font-bold text-white hover:bg-neutral-800">
              Edit Profil
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
