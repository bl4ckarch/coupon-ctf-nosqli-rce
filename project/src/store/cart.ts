import { create } from 'zustand';
import { CartState, Product } from '../types';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.productId === product._id);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({
        items: [...items, { productId: product._id, product, quantity: 1 }]
      });
    }
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter((item) => item.productId !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    const updatedItems = get().items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    set({ items: updatedItems });
  },

  validateCoupon: async (code) => {
    const res = await fetch('/api/cart/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ couponCode: code })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid coupon');
    }
    return data;
  },

  clearCart: () => set({ items: [] })
}));
