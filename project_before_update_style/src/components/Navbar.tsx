import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { isAuthenticated, isAdmin, logout } from '../auth';

function Navbar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const adminUser = isAdmin();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Coupon Madness
          </Link>
          <div className="flex items-center gap-6">
            {authenticated ? (
              <>
                <Link to="/cart" className="hover:text-gray-300">
                  <ShoppingCart size={20} />
                </Link>
                <Link to="/dashboard" className="hover:text-gray-300">
                  <User size={20} />
                </Link>
                {adminUser && (
                  <Link to="/admin" className="text-red-400 hover:text-red-300">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;