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

                toast.success(`Logged in as: ${data.userType}`);

                if (data.userType === "admin") {
                    navigate("/admin");
                } else if (data.userType === "pharmacist") {
                    navigate("/pharmacist");
                } else {
                    navigate("/profile");
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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Log In</h2>
                <form onSubmit={loginSubmit}>
                    <div className="relative mb-6">
                        <i className="fas fa-user text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"></i>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-8 border-b-2 border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="relative mb-6">
                        <i className="fas fa-lock text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"></i>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-8 border-b-2 border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded mt-6 hover:bg-blue-600 transition"
                    >
                        Log In
                    </button>
                </form>
                <div className="text-center text-gray-600 mt-6">
                    <Link to="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
