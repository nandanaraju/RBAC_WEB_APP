import React from 'react';
import { Link } from 'react-router-dom';

const PharmacistPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 text-center">
            <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Pharmacist Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {/* User Management */}
                    <Link
                        to="/pres"
                        className="bg-blue-500 text-white p-6 rounded-lg shadow hover:shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        <div className="text-4xl font-bold mb-4">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="text-xl">Prescription Management</div>
                    </Link>

                    {/* Products Management */}
                    <Link
                        to="/products"
                        className="bg-green-500 text-white p-6 rounded-lg shadow hover:shadow-md hover:bg-green-600 transition duration-300"
                    >
                        <div className="text-4xl font-bold mb-4">
                            <i className="fas fa-box"></i>
                        </div>
                        <div className="text-xl">Products Management</div>
                    </Link>

                    </div>
            </div>
        </div>

    );
};

export default PharmacistPage;