/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Bell } from "lucide-react";
import { formatCurrency } from "../../lib/utils";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Pendapatan", value: 12500000, icon: <DollarSign className="h-6 w-6" />, color: "bg-green-500", trend: "+12.5%" },
    { label: "Total Pesanan", value: 156, icon: <ShoppingBag className="h-6 w-6" />, color: "bg-blue-500", trend: "+8.2%" },
    { label: "Produk Aktif", value: 42, icon: <Package className="h-6 w-6" />, color: "bg-orange-500", trend: "0%" },
    { label: "Total Pelanggan", value: 240, icon: <Users className="h-6 w-6" />, color: "bg-purple-500", trend: "+15.3%" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-neutral-900">Dashboard Admin</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200">
          <Bell className="h-5 w-5 text-neutral-600" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-[2rem] border border-neutral-100 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl text-white ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-neutral-50 text-neutral-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
            <h3 className="text-2xl font-black text-neutral-900 mt-1">
              {typeof stat.value === 'number' && stat.label.includes('Pendapatan') 
                ? formatCurrency(stat.value) 
                : stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-neutral-900">Pesanan Terbaru</h3>
            <button className="text-sm font-bold text-orange-600 hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between pb-6 border-b border-neutral-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center font-bold text-orange-600">
                    #{order}29
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Budi Sudarsono</h4>
                    <p className="text-xs text-neutral-500">2 menit yang lalu</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900 text-sm">{formatCurrency(450000)}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-[2.5rem] border border-neutral-100 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-neutral-900">Produk Terlaris</h3>
            <button className="text-sm font-bold text-orange-600 hover:underline">Managemen Produk</button>
          </div>
          <div className="space-y-6">
            {[
              { name: "Tas Tenun Handmade", sales: 84, growth: <TrendingUp className="h-3 w-3" /> },
              { name: "Kopi Arabika Gayo", sales: 62, growth: null },
              { name: "Lampu Meja Bambu", sales: 45, growth: <TrendingUp className="h-3 w-3" /> },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between pb-6 border-b border-neutral-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-neutral-100 flex items-center justify-center font-bold text-neutral-400">
                    P{i+1}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">{product.name}</h4>
                    <p className="text-xs text-neutral-500">{product.sales} Terjual</p>
                  </div>
                </div>
                {product.growth && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                    {product.growth}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
