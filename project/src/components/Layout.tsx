import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <nav className="bg-black/95 fixed w-full z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-red-600 text-2xl font-bold">CTF Shop</Link>
          
          <div className="flex items-center gap-6">
            <Link to="/products" className="hover:text-red-600">Products</Link>
            {user ? (
              <>
                <Link to="/cart" className="hover:text-red-600">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <Link to="/dashboard" className="hover:text-red-600">
                  <User className="w-6 h-6" />
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="hover:text-red-600">Admin</Link>
                )}
                <button onClick={handleLogout} className="hover:text-red-600">
                  <LogOut className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-red-600">Login</Link>
                <Link to="/register" className="hover:text-red-600">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};