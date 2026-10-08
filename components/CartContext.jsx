'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FLAVORS, FREE_SHIPPING_THRESHOLD, getFlavor } from '@/data/flavors';

const CartContext = createContext(null);
const STORAGE_KEY = 'chomp-cart-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, qty }]
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore cart from localStorage on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* corrupted storage — start fresh */
    }
    setHydrated(true);
  }, []);

  // Persist on every change.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* private mode / quota — ignore */
    }
  }, [items, hydrated]);

  // Lock body scroll while the drawer is open, and close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const addItem = useCallback((id, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id, qty }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const addBundle = useCallback(() => {
    setItems(FLAVORS.map((f) => ({ id: f.id, qty: 1 })));
    setIsOpen(true);
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => {
      const flavor = getFlavor(i.id);
      return sum + (flavor ? flavor.price * i.qty : 0);
    }, 0);
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

    return {
      items,
      count,
      subtotal,
      remaining,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      addBundle,
      updateQty,
      removeItem,
      clear,
      hydrated,
    };
  }, [items, isOpen, addItem, addBundle, updateQty, removeItem, clear, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
