import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Welcome to Coupon Madness
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. Use our special coupons during checkout to unlock exclusive discounts!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center">
              <ShoppingBag size={64} className="text-gray-400" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mb-4 min-h-[3rem]">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                <button 
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transform transition-transform active:scale-95 flex items-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;