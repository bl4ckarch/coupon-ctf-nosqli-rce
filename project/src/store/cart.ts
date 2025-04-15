import { create } from 'zustand';
import { CartState, Product } from '../types';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: async (product: Product) => {
    const existing = get().items.find(item => item.productId === product._id);
    const quantity = existing ? existing.quantity + 1 : 1;

    const updatedItems = existing
      ? get().items.map(item =>
          item.productId === product._id ? { ...item, quantity } : item
        )
      : [...get().items, { product, productId: product._id, quantity }];

    set({ items: updatedItems });

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        console.error('[!] Failed to sync cart with backend');
      }
    } catch (err) {
      console.error('[!] Cart sync error:', err);
    }
  },
  removeFromCart: (productId: string) =>
    set((state: CartState) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),
  updateQuantity: (productId: string, quantity: number) =>
    set((state: CartState) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
  validateCoupon: async (couponCode: string) => {
    const response = await fetch('/api/cart/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ couponCode }),
    });

    if (!response.ok) {
      throw new Error('Invalid coupon');
    }

    return await response.json();
  },
}));
