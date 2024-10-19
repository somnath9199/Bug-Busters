import { Link } from 'react-router-dom';
import React from 'react';

const Hero = () => {
  return (
    <div id="Home">
      <header
        className="bg-white p-8 h-[37rem]"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/026/986/858/non_2x/single-continuous-line-drawing-buying-or-renting-car-car-and-money-holding-in-hand-hand-of-car-salesman-manager-and-customer-holding-car-and-money-one-line-draw-graphic-design-illustration-png.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="grid min-h-full w-full place-items-center mb-12">
          <div className="container mx-auto px-4 py-12 mb-[16rem] text-center ">
            <div className="inline-flex text-sm rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-8 px-1 font-medium text-primary">
              We grow Make others Grow .!
            </div>
            <h1
              className="mx-auto my-5 w-full text-2xl lg:max-w-3xl lg:text-6xl leading-snug font-bold text-gray-900"
              style={{ lineHeight: '1.3' }}
            >
              <span className="text-green-500 font-bold ">Money</span>
              <span className="mx-5px"> matters when we </span>
              <span className="text-green-500 font-bold"> Invest it.</span>.
            </h1>
            <p className="mx-auto my-12 w-full text-gray-1000 lg:text-lg text-base leading-relaxed max-w-6xl">
            </p>


            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-5 py-2 border rounded-lg w-42 md:w-40 lg:w-[18rem]"
                />
                <Link to="/Register">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg w-full md:w-auto">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Hero;