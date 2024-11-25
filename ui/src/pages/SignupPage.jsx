import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user"); // Default to 'user'
    const navigate = useNavigate();

    const signupSubmit = async (userDetails) => {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });

            if (res.ok) {
                toast.success("Signup successful");
                navigate("/login");
            } else {
                const { error } = await res.json();
                toast.error(error || "Please check the input data");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        const userDetails = {
            username,
            password,
            email,
            userType,
        };

        signupSubmit(userDetails);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-teal-50">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
                {/* Left Section */}
                <div className="w-1/2 bg-teal-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome Back!</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        To keep connected with us, please login with your personal info.
                    </p>
                    <Link to="/login">
                        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                            Sign In
                        </button>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-r-lg">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">
                        Create Account
                    </h2>
                    <form onSubmit={submitForm}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Name"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                        {/* Role Selection */}
                        <div className="mb-4">
                            <label
                                htmlFor="userType"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Select User Type
                            </label>
                            <select
                                id="userType"
                                name="userType"
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                            >
                                <option value="user">User</option>
                                <option value="pharmacist">Pharmacist</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <button
                                type="submit"
                                className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 w-full"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
