import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Product from './Product';

const LandingPage = () => {
  return (
    <>
    
    <Navbar/>
    <Hero/>
    <hr />
    <Product/>

     

    
{/* CTA Section */}
<section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-4">Ready to Take Your Business to the Next Level?</h2>
    <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition">
      Get Started
    </button>
  </div>
</section>


      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-12">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-8 p-7">
      {/* About Section */}
      <div>
        <h3 className="text-white font-bold text-xl mb-4">About ShopCA</h3>
        <p className="leading-relaxed">
          Your SaaS partner for the modern e-commerce world, providing everything you need to scale your business.
        </p>
      </div>
      {/* Quick Links Section */}
      <div>
        <h3 className="text-white font-bold text-xl mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-white transition">Features</a></li>
          <li><a href="#" className="hover:text-white transition">Pricing</a></li>
          <li><a href="#" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
      {/* Contact Section */}
      <div>
        <h3 className="text-white font-bold text-xl mb-4">Contact Us</h3>
        <p className="leading-relaxed">Email: <a href="mailto:support@shopca.com" className="hover:text-white transition">support@shopca.com</a></p>
        <p className="leading-relaxed">Phone: <a href="tel:+1234567890" className="hover:text-white transition">+123 456 7890</a></p>
      </div>
    </div>
    <hr />
    <div className="mt-8 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} ShopCA. All rights reserved.
    </div>
  </div>
</footer>

    
    </>
  );
};

export default LandingPage;
