import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/dia.png';

const Home = () => {
    return (
        <>
            {/* Main Section */}
            <div className="bg-gray-100 text-gray-800 mt-0 mb-0 mx-auto flex flex-col md:flex-row items-center justify-between px-12 py-20 shadow-lg rounded-lg">
                {/* Text Section */}
                <div className="w-full md:w-1/2 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-6">
                        Welcome to 
                        <br /> Carewell Pharmacy
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                        At Carewell Pharmacy, your health and well-being are our top priorities. We are dedicated to providing you with the highest quality pharmaceutical care, exceptional customer service, and a wide range of products to meet all your healthcare needs.
                    </p>
            
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center items-center animate-spin-slow">
                    <div className="relative rounded-full shadow-xl overflow-hidden border-4 border-gray-700">
                        <img
                            src={img1}
                            alt="Pharmacy Products"
                            className="w-80 h-80 md:w-96 md:h-96 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Order with Prescription Section */}
            <div className="bg-gray-100 text-gray-800 mx-auto px-8 py-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center lg:items-start">
    {/* Left Section */}
    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 rounded-full p-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0v-6a2 2 0 00-2-2h-2m-4 0H9a2 2 0 00-2 2v6m0 4h10a2 2 0 002-2H7a2 2 0 01-2 2z"
                    />
                </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Order with Prescription</h2>
        </div>
        <p className="text-gray-600 mb-4">
            Upload your prescription and let us deliver your medicines straight to your doorstep.
        </p>
        <Link
            to="/login"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md shadow-md transition duration-300"
        >
            Upload
        </Link>
    </div>

    {/* Right Section */}
    <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">How does this work?</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-600">
            <li>
                <span className="text-gray-800 font-medium">Upload</span> a photo of your prescription.
            </li>
            <li>
                <span className="text-gray-800 font-medium">Add</span> your delivery address and place the order.
            </li>
            <li>
                <span className="text-gray-800 font-medium">We will call</span> you to confirm your medicines.
            </li>
            <li>
                <span className="text-gray-800 font-medium">Relax!</span> Your medicines will get delivered to your doorstep.
            </li>
        </ol>
    </div>
</div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-100 text-gray-800 py-16 px-8 mx-auto rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-bold mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-yellow-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className="text-yellow-500 text-4xl font-bold">46 Million+</span>
                        <p className="text-gray-600">Registered users as of Oct 31, 2024</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 21l-8-4-8 4V5a2 2 0 012-2h12a2 2 0 012 2z"
                            />
                        </svg>
                        <span className="text-green-500 text-4xl font-bold">66 Million+</span>
                        <p className="text-gray-600">Orders on CareWell till date</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 12H4"
                            />
                        </svg>
                        <span className="text-blue-500 text-4xl font-bold">60,000+</span>
                        <p className="text-gray-600">Unique items sold in the last 6 months</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19V6a2 2 0 012-2h2a2 2 0 012 2v13m-2 0h-4"
                            />
                        </svg>
                        <span className="text-red-500 text-4xl font-bold">19,000+</span>
                        <p className="text-gray-600">Pin codes serviced in the last 3 months</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
