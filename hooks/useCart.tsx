"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, Puppy } from "@/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (puppy: Puppy) => void;
  removeItem: (puppyId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "gp_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (puppy: Puppy) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.puppy.id === puppy.id);
      if (exists) return prev;
      return [...prev, { puppy, quantity: 1 }];
    });
  };

  const removeItem = (puppyId: string) => {
    setItems((prev) => prev.filter((i) => i.puppy.id !== puppyId));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.length;
  const totalPrice = items.reduce(
    (sum, i) => sum + i.puppy.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
