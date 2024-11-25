import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const data = await res.json();

                // Display success message with user type
                toast.success(`Logged in as: ${data.userType}`);

                // Navigate to appropriate page based on userType
                if (data.userType === "admin") {
                    navigate("/admin-dashboard");
                } else if (data.userType === "pharmacist") {
                    navigate("/pharmacist-dashboard");
                } else {
                    navigate("/user-profile");
                }
            } else {
                const { error } = await res.json();
                toast.error(error || "Invalid username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-teal-50">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
                {/* Left Section */}
                <div className="w-1/2 bg-teal-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Hello, Friend!</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Don't have an account? Create your account to start using our services.
                    </p>
                    <Link to="/sign-up">
                        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                            Sign Up
                        </button>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-r-lg">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">
                        Log In
                    </h2>
                    <form onSubmit={loginSubmit}>
                        <div className="mb-4">
                            <input
                                type="username"
                                id="username"
                                name="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <button
                                type="submit"
                                className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 w-full"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <Link to="/forgot-password" className="text-teal-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
