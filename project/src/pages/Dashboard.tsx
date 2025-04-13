import React from 'react';
import { useAuthStore } from '../store/auth';
import { useCartStore } from '../store/cart';

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  const cartItems = useCartStore(state => state.items);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-[#1f1f1f] rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.firstName}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <div className="space-y-2">
              <p><span className="text-gray-400">Username:</span> {user?.username}</p>
              <p><span className="text-gray-400">Name:</span> {user?.firstName} {user?.lastName}</p>
              <p><span className="text-gray-400">Address:</span> {user?.address}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex justify-between">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span className="text-red-600">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}