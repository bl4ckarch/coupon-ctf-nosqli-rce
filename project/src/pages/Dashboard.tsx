import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';

function Dashboard() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch('/dashboard')
      .then((res) => res.json())
      .then(setCart)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Current Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <span className="font-bold">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;