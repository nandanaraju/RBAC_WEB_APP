import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("user"); // Default is user
    const [adminPassphrase, setAdminPassphrase] = useState("");
    const navigate = useNavigate();

    const registerSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const userData = {
            username,
            password,
            email,
            userType,
            adminPassphrase: userType === "admin" ? adminPassphrase : undefined, // Include only for admin
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
                const data = await res.json();
                toast.success(`${userType} registered successfully`);

                // Redirect based on user type
                if (userType === "admin"||"user"||"pharmacist") {
                    navigate("/login");
                } else {
                    navigate("/login");
                }
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
        <div className="flex items-center justify-center h-screen bg-teal-50">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
                {/* Left Section */}
                <div className="w-1/2 bg-teal-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome!</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Already have an account? Log in to start using our services.
                    </p>
                    <Link to="/login">
                        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                            Log In
                        </button>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-r-lg">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">
                        Sign Up
                    </h2>
                    <form onSubmit={registerSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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

                        <div className="mb-4">
                            <label htmlFor="userType" className="block text-gray-700">
                                User Type
                            </label>
                            <select
                                id="userType"
                                name="userType"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="user">User</option>
                                <option value="pharmacist">Pharmacist</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Admin Passphrase Field (shown only if userType is admin) */}
                        {userType === "admin" && (
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="adminPassphrase"
                                    name="adminPassphrase"
                                    placeholder="Admin Passphrase"
                                    value={adminPassphrase}
                                    onChange={(e) => setAdminPassphrase(e.target.value)}
                                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                        )}

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

export default SignUpPage;
