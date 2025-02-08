import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Building2, Menu, LogOut, UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-brand-600" />
            <div>
              <span className="text-xl font-display font-semibold text-slate-800">Labour Connect</span>
              <span className="hidden md:block text-sm text-slate-500">Professional Labour Management</span>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-slate-600 hover:text-brand-600 transition-colors"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-slate-600 hover:text-brand-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;