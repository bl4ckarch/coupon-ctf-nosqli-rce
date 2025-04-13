import React from 'react';
import { Link } from 'react-router-dom';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800',
    price: 999.99
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    price: 199.99
  },
  {
    id: '3',
    name: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    price: 299.99
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="relative h-[70vh] bg-gradient-to-b from-black/60 to-[#141414]">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to CTF Shop</h1>
            <p className="text-xl mb-8">Discover our exclusive collection of premium products.</p>
            <Link
              to="/products"
              className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-[#1f1f1f] rounded-lg overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-red-600 font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}