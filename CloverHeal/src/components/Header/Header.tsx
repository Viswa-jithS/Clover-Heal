import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header backdrop-blur-md bg-white/80 sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container">
        <div className="header-content flex justify-between items-center py-4">
          <div className="logo flex-shrink-0">
            <Link to="/">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                CloverHeal
              </h2>
            </Link>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open flex flex-col absolute top-full left-0 w-full bg-white shadow-lg p-4' : 'hidden md:flex space-x-8'}`}>
            <Link to={isHome ? "#home" : "/"} className="nav-link font-medium text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <a href={isHome ? "#services" : "/#services"} className="nav-link font-medium text-gray-600 hover:text-blue-600 transition-colors">Services</a>
            <a href={isHome ? "#about" : "/#about"} className="nav-link font-medium text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href={isHome ? "#contact" : "/#contact"} className="nav-link font-medium text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          <div className="header-actions hidden md:flex items-center gap-4">
            <Link to="/assessment" className="btn-primary bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Enter Symptoms
            </Link>
          </div>
          <button 
            className="menu-toggle md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-gray-600 mb-1.5"></span>
            <span className="block w-6 h-0.5 bg-gray-600 mb-1.5"></span>
            <span className="block w-6 h-0.5 bg-gray-600"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
