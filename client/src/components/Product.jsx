import React from 'react';
import { motion } from 'framer-motion';
import productimage from '../assets/FF.webp';
import Secondimage from '../assets/ss.webp';
import Thirdimage from '../assets/Third.svg';
import FourthImage from '../assets/4.webp';
import FifthImage from '../assets/5.webp';
import SixthImage from '../assets/6.jpg';

const Product = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-gray-50 py-16" id='features'>
      <div className="container mx-auto px-4">
        {/* Headline and Subheadline */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl text-green-500 font-bold mb-4">Discover Our Schemes</h2>
          <p className="text-lg text-gray-700">
            This schemes helps you to grow mentally and financally 
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img src={productimage} alt="Personalized Learning Paths" className="w-[12rem] h-[12rem] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Tax Optimization Scheme</h3>
            <p className="text-gray-600 text-center">
            Provide tools and resources to help shopkeepers understand and optimize their tax liabilities.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img src={Secondimage} alt="Interactive Speaking Practice" className="w-[18rem] h-[12rem] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Profit Reinvestment Plan</h3>
            <p className="text-gray-600 text-center">
            A structured plan that encourages shopkeepers to reinvest their profits back into the business.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img src={Thirdimage} alt="Grammar and Vocabulary Enhancement" className="w-[12rem] h-[12rem] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Cash Flow Management Tool</h3>
            <p className="text-gray-600 text-center">
            A tool designed to help shopkeepers track their cash flow more effectively.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img src={FourthImage} className="w-[12rem] h-[12rem] mb-4 mx-auto" alt="24/7 Availability" />
            <h3 className="text-xl font-semibold mb-2 text-center">Expense Tracking and Reduction Program</h3>
            <p className="text-gray-600 text-center">
            A program that helps shopkeepers track their expenses and identify areas for cost savings.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img src={FifthImage} alt="Adaptive AI Tutor" className="w-[12rem] h-[12rem] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Investment Education and Resources</h3>
            <p className="text-gray-600 text-center">
            An educational component that offers resources and training on various investment options. 
            </p>
          </motion.div>

          {/* Feature 6 */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <img src={SixthImage} alt="Progress Tracking and Analytics" className="w-[12rem] h-[12rem] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Insurance and Risk Management Guidance</h3>
            <p className="text-gray-600 text-center">
            A service that provides shopkeepers with information and options for managing business risks through insurance.
            </p>
          </motion.div>
        </div>
      </div> 
    </section>
  );
};

export default Product;
