import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/dia.png';

const Home = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-teal-100 via-white to-teal-50 mt-[10px] mb-[20px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 md:space-x-12">
                {/* Text Section */}
                <div className="w-full md:w-2/5 mt-10 md:mt-0">
                    <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-teal-700 leading-tight mb-6">
                        Welcome to Carewell Pharmacy
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                        At Carewell Pharmacy, your health and well-being are our top priorities. We are dedicated to providing you with the highest quality pharmaceutical care, exceptional customer service, and a wide range of products to meet all your healthcare needs.
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                        Experience the difference at Carewell Pharmacy, where your health is in good hands. Visit us in-store or explore our website to discover all the ways we can support your health journey.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white text-lg font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-teal-400 transition-all duration-300 transform hover:scale-105"
                    >
                        GET STARTED
                    </Link>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-3/5 flex justify-center items-center animate-spin-slow">
                    <div className="relative">
                        <img
                            src={img1}
                            alt="Placeholder Image"
                            className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full shadow-xl transform hover:rotate-6 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
