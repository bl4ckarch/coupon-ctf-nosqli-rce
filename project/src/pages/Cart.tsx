import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { Trash2, Tag } from 'lucide-react';

function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponResponse, setCouponResponse] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    fetch('/cart')
      .then((res) => res.json())
      .then(setCart)
      .catch(console.error);
  }, []);

  const applyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingCoupon(true);
    try {
      const response = await fetch('/apply-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode }),
      });
      const data = await response.json();
      setCouponResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Failed to apply coupon:', err);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-lg font-bold text-purple-600">
                          ${item.price * item.quantity}
                        </span>
                        <button className="text-red-500 hover:text-red-600">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag size={20} />
                Apply Coupon
              </h3>
              <form onSubmit={applyCoupon} className="space-y-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isApplyingCoupon}
                  className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transform transition-transform active:scale-95 disabled:opacity-50"
                >
                  Apply Coupon
                </button>
              </form>
              {couponResponse && (
                <pre className="mt-4 bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                  {couponResponse}
                </pre>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
                <button className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transform transition-transform active:scale-95">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;