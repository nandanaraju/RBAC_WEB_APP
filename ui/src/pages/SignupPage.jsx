import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("admin");
    const [adminPassphrase, setAdminPassphrase] = useState("");
    const navigate = useNavigate();

    const registerSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
            email,
            userType,
            adminPassphrase: userType === "admin" ? adminPassphrase : undefined,
        };

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                toast.success(`${userType} registered successfully`);
                navigate("/login");
            } else {
                const { error } = await res.json();
                toast.error(error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                <form onSubmit={registerSubmit}>
                    <div className="relative mb-6">
                        <i className="fas fa-user text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"></i>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-8 border-b-2 border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="relative mb-6">
                        <i className="fas fa-envelope text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"></i>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-8 border-b-2 border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="relative mb-6">
                        <i className="fas fa-lock text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-8 border-b-2 border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="relative mb-6">
                        <i className="fas fa-user-tag text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"></i>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full pl-8 border-b-2 border-gray-300 bg-transparent text-gray-800 outline-none focus:border-blue-500 transition"
                            required
                        >
                            {/* <option value="user" className="bg-white text-gray-800">
                                User
                            </option> */}
                            <option value="admin" className="bg-white text-gray-800">
                                Admin
                            </option>
                        </select>
                    </div>
                    {userType === "admin" && (
                        <div className="relative mb-6">
                            <i className="fas fa-key text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2 ml-2"></i>
                            <input
                                type="text"
                                placeholder="Admin Passphrase"
                                value={adminPassphrase}
                                onChange={(e) => setAdminPassphrase(e.target.value)}
                                className="w-full pl-8 border-b-2 border-gray-300 bg-transparent text-gray-800 placeholder-gray-500 outline-none focus:border-blue-500 transition"
                                required
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded mt-6 hover:bg-blue-600 transition"
                    >
                        SIGN UP
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
