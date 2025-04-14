import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  validateCoupon: (couponCode: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.items.find(item => item.productId === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { productId: product.id, quantity: 1, product }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter(item => item.productId !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
  validateCoupon: async (couponCode) => {
    const response = await fetch('/api/cart/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ couponCode }),
    });
    if (!response.ok) {
      throw new Error('Invalid coupon code');
    }
  },
  clearCart: () => set({ items: [] }),
}));