import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

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
        <div className="bg-white shadow sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10">
                {/* Logo */}
                <div className="text-xl md:text-2xl font-bold text-gray-800">
                    Carewell Pharmacy
                </div>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            About Us
                        </Link>
                    </li>
                    {userType === 'admin' && (
                        <li>
                            <Link
                                to="/admin"
                                className="hover:text-blue-600 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}
                    {userType === 'user' && (
                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-blue-600 transition-colors duration-200"
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
                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
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
