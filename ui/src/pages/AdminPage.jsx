import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 text-center">
            <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* User Management */}
                    <Link
                        to="/admin-dashboard"
                        className="bg-blue-500 text-white p-6 rounded-lg shadow hover:shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        <div className="text-4xl font-bold mb-4">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="text-xl">User Management</div>
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

                    {/* Add Product */}
                    <Link
                        to="/add-product"
                        className="bg-purple-500 text-white p-6 rounded-lg shadow hover:shadow-md hover:bg-purple-600 transition duration-300"
                    >
                        <div className="text-4xl font-bold mb-4">
                            <i className="fas fa-plus-circle"></i>
                        </div>
                        <div className="text-xl">Add Product</div>
                    </Link>

                    {/* Message Management */}
                    <Link
                        to="/message"
                        className="bg-red-500 text-white p-6 rounded-lg shadow hover:shadow-md hover:bg-red-600 transition duration-300"
                    >
                        <div className="text-4xl font-bold mb-4">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div className="text-xl">Message Management</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
