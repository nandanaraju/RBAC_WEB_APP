import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserType = () => {
            const authToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('Authtoken'))
                ?.split('=')[1];
            if (authToken) {
                const decoded = jwtDecode(authToken);
                return decoded.userType;
            }
            return null;
        };

        setUserType(getUserType());
    }, []);

    const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
        });
        setUserType(null);
        navigate('/');
    };

    return (
        <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 shadow-md sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center py-3 px-4 md:px-10">
                {/* Logo */}
                <div className="text-2xl font-extrabold text-white">
                    Carewell Pharmacy
                </div>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-6 items-center text-white font-semibold">
                    <li>
                        <Link
                            to="/"
                            className="hover:scale-105 transition-transform duration-200 hover:underline decoration-white"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className="hover:scale-105 transition-transform duration-200 hover:underline decoration-white"
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="hover:scale-105 transition-transform duration-200 hover:underline decoration-white"
                        >
                            About Us
                        </Link>
                    </li>
                    {userType === 'admin' && (
                        <li>
                            <Link
                                to="/admin"
                                className="hover:scale-105 transition-transform duration-200 hover:underline decoration-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}
                    {userType === 'user' && (
                        <li>
                            <Link
                                to="/contact"
                                className="hover:scale-105 transition-transform duration-200 hover:underline decoration-white"
                            >
                                Contact Us
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Login/Logout Button */}
                <div className="ml-auto md:ml-0">
                    {userType ? (
                        <button
                            onClick={handleLogout}
                            className="bg-white text-teal-600 text-sm px-4 py-2 rounded-full font-bold shadow hover:bg-gray-100 hover:text-teal-700 hover:scale-105 transition-transform duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-teal-600 text-sm px-4 py-2 rounded-full font-bold shadow hover:bg-gray-100 hover:text-teal-700 hover:scale-105 transition-transform duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
