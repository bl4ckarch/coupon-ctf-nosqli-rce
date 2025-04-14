import React from 'react';
import { Link } from 'react-router-dom';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Gaming Laptop',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
    price: 1299.99
  },
  {
    id: '2',
    name: 'Premium Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    price: 299.99
  },
  {
    id: '3',
    name: '4K Gaming Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    price: 599.99
  },
  {
    id: '4',
    name: 'xbox controller',
    image: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eGJveHxlbnwwfHwwfHx8MA%3D%3D',
    price: 599.99
  },
  {
    id: '5',
    name: 'xbox',
    image: 'https://images.unsplash.com/photo-1612801799890-4ba4760b6590?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHhib3h8ZW58MHx8MHx8fDA%3D',
    price: 599.99
  }
  
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="relative h-[80vh] bg-gradient-to-b from-black/60 to-[#141414]">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-4">Welcome to CTF Shop</h1>
            <p className="text-2xl mb-8 text-gray-300">Your destination for premium gaming gear.</p>
            <Link
              to="/products"
              className="bg-red-600 text-white px-8 py-3 rounded text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-[#1f1f1f] rounded-lg overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-red-600 text-xl font-bold">${product.price}</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}