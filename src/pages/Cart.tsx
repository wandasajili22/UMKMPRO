import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { formatCurrency } from "../lib/utils";
import { motion } from "motion/react";

export default function Cart() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  if (items.length === 0) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
      <div className="h-24 w-24 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400"><ShoppingBag className="h-10 w-10"/></div>
      <h2 className="text-2xl font-bold">Keranjang Kosong</h2>
      <Link to="/" className="rounded-full bg-orange-600 px-8 py-3 font-bold text-white">Mulai Belanja</Link>
    </div>
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-black mb-8">Keranjang Belanja</h1>
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-3xl border border-neutral-100 bg-white p-4 sm:p-6 shadow-sm">
              <img src={item.image} alt={item.name} className="aspect-video sm:h-32 sm:w-32 rounded-2xl object-cover w-full sm:shrink-0" />
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm sm:text-base">{item.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-neutral-400 hover:text-red-600 p-2"><Trash2 className="h-5 w-5"/></button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 border border-neutral-200 rounded-xl p-1 scale-90 sm:scale-100 origin-left">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-600"><Minus className="h-4 w-4"/></button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-600"><Plus className="h-4 w-4"/></button>
                  </div>
                  <p className="font-black text-orange-600 text-base sm:text-lg">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[2rem] border bg-white p-8 h-fit space-y-6 shadow-xl shadow-neutral-200/50">
          <h3 className="text-xl font-bold">Ringkasan Pesanan</h3>
          <div className="flex justify-between text-2xl font-black text-orange-600 border-t pt-6"><span>Total</span><span>{formatCurrency(total)}</span></div>
          <button className="w-full rounded-2xl bg-neutral-900 py-4 font-bold text-white hover:bg-neutral-800 transition-all">Checkout</button>
        </div>
      </div>
    </div>
  );
}
