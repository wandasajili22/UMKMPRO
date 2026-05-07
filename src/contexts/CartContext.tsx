import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  items: [], addItem: () => {}, removeItem: () => {}, updateQuantity: () => {}, clearCart: () => {}, total: 0, itemCount: 0,
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem("cart");
      if (saved) setItems(JSON.parse(saved));
    } else {
      const unsubscribe = onSnapshot(doc(db, "carts", user.uid), (doc) => {
        if (doc.exists()) setItems(doc.data().items || []);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const saveCart = async (newItems: CartItem[]) => {
    setItems(newItems);
    if (user) {
      try {
        await setDoc(doc(db, "carts", user.uid), { items: newItems });
      } catch (e) { console.error(e); }
    } else {
      localStorage.setItem("cart", JSON.stringify(newItems));
    }
  };

  const addItem = (item: CartItem) => {
    const existing = items.find((i) => i.id === item.id);
    if (existing) updateQuantity(item.id, existing.quantity + 1);
    else saveCart([...items, item]);
  };

  const removeItem = (id: string) => saveCart(items.filter((i) => i.id !== id));
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return removeItem(id);
    saveCart(items.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };
  const clearCart = () => saveCart([]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>{children}</CartContext.Provider>;
}
