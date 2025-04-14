import React, { useState } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cart';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, validateCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const rawTotal = items.reduce((sum, item) => (
    sum + item.product.price * item.quantity
  ), 0);

  const discountedTotal = discountApplied ? rawTotal * 0.1 : rawTotal;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    try {
      const result = await validateCoupon(couponCode);
      // Si on a une réponse valide => succès
      setCouponSuccess('Coupon applied successfully! 🎉');
      setDiscountApplied(true);
    } catch (err) {
      setCouponError('Invalid coupon code');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-[#1f1f1f] rounded-lg p-4 flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-red-600 font-bold">${item.product.price}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="p-1 hover:text-red-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="p-1 hover:text-red-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-[#1f1f1f] rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${discountedTotal.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div className="text-green-500 text-sm">✅ -90% coupon applied</div>
              )}
            </div>
            
            <form onSubmit={handleCouponSubmit} className="mb-6">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.replace(/"/g, '').trim())}
                  className="flex-1 bg-[#2a2a2a] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter code"
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-600 text-sm mt-1">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="text-green-500 text-sm mt-1">{couponSuccess}</p>
              )}
            </form>
            
            <button
              className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
            >
              Checkout (${discountedTotal.toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
