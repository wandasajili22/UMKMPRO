/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Package, ChevronRight, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { formatCurrency } from "../lib/utils";
import { Link } from "react-router-dom";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: any;
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "processing": return <Package className="h-4 w-4 text-blue-500" />;
      case "shipped": return <Truck className="h-4 w-4 text-orange-500" />;
      case "delivered": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Menunggu Pembayaran";
      case "processing": return "Diproses";
      case "shipped": return "Dikirim";
      case "delivered": return "Selesai";
      case "cancelled": return "Dibatalkan";
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Silakan masuk untuk melihat pesanan</h2>
        <Link to="/login" className="rounded-full bg-orange-600 px-6 py-2 font-bold text-white hover:bg-orange-700">
          Masuk Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-neutral-900">Pesanan Saya</h1>
        <p className="text-neutral-500">Pantau status pengiriman dan riwayat belanja Anda.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 w-full animate-pulse rounded-[2rem] bg-neutral-100" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[3rem] border-2 border-dashed border-neutral-100 py-20 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-neutral-200" />
          <h3 className="text-xl font-bold text-neutral-900">Belum Ada Pesanan</h3>
          <p className="mb-8 text-neutral-500">Anda belum melakukan pembelian apapun.</p>
          <Link to="/products" className="rounded-full bg-neutral-900 px-8 py-3 font-bold text-white hover:bg-neutral-800">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-[2.5rem] border border-neutral-100 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-50 bg-neutral-50/50 px-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-neutral-400">Order ID:</span>{" "}
                    <span className="font-bold text-neutral-900">#{order.id.slice(0, 8)}</span>
                  </div>
                  <div className="hidden h-4 w-px bg-neutral-200 sm:block" />
                  <div className="text-sm">
                    <span className="text-neutral-400">Tanggal:</span>{" "}
                    <span className="font-bold text-neutral-900">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString("id-ID") : new Date(order.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold shadow-sm">
                  {getStatusIcon(order.status)}
                  <span className="uppercase tracking-wider">{getStatusText(order.status)}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-neutral-900">{item.name}</h4>
                        <p className="text-sm text-neutral-500">{item.quantity} x {formatCurrency(item.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-neutral-900">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-neutral-100 pt-8">
                  <div className="space-y-1">
                    <p className="text-sm text-neutral-400">Total Pembayaran</p>
                    <p className="text-2xl font-black text-orange-600">{formatCurrency(order.total)}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="rounded-2xl border border-neutral-200 px-6 py-3 text-sm font-bold hover:bg-neutral-50">
                      Detail Pesanan
                    </button>
                    {order.status === "delivered" && (
                      <button className="rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-bold text-white hover:bg-neutral-800">
                        Beri Ulasan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
