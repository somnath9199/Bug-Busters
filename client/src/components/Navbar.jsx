import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">ShopCA</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
        <a href="#Home" className="block text-gray-600 hover:text-blue-600 font-medium">Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Features</a>
          <a href="/Dashboard" className="block text-gray-600 hover:text-blue-600 font-medium">Dashboard</a>     
          <a href="/Register" className="text-gray-600 hover:text-blue-600 font-medium">Register</a>
          <a href="/login" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Login</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-gray-600 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="space-y-2 py-2 px-6">
          <a href="#features" className="block text-gray-600 hover:text-blue-600 font-medium">Home</a>
            <a href="#features" className="block text-gray-600 hover:text-blue-600 font-medium">Features</a>
            <a href="/Dashboard" className="block text-gray-600 hover:text-blue-600 font-medium">Dashboard</a>
            <a href="#contact" className="block text-gray-600 hover:text-blue-600 font-medium">Contact</a>
            <a href="/Register" className="text-gray-600 hover:text-blue-600 font-medium">Register</a>
            <a href="/login" className="block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Login</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;