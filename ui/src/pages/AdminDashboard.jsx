import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            console.log(data); // Debug the response
            setUsers(data);
        } catch (error) {
            toast.error("Failed to fetch users");
            setUsers([]); // Ensure it's an array
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/add-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, userType }),
                credentials: "include",
            });
            if (res.ok) {
                toast.success(`${userType} added successfully`);
                fetchUsers();
                setUsername("");
                setEmail("");
                setPassword("");
                setUserType("user");
            } else {
                toast.error("Failed to add user");
            }
        } catch (error) {
            toast.error("Error adding user");
        }
    };

    const editUser = (user) => {
        setEditingUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setUserType(user.userType);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/users/${editingUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, userType }),
                credentials: "include",
            });
            if (res.ok) {
                toast.success("User updated successfully");
                fetchUsers();
                setEditingUser(null);
                setUsername("");
                setEmail("");
                setPassword("");
                setUserType("user");
            } else {
                toast.error("Failed to update user");
            }
        } catch (error) {
            toast.error("Error updating user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <form onSubmit={editingUser ? updateUser : addUser} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                {!editingUser && (
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                )}
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="user">User</option>
                    <option value="pharmacist">Pharmacist</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editingUser ? "Update" : "Add"}
                </button>
            </form>
            <ul className="mt-6 space-y-2">
                {Array.isArray(users) &&
                    users.map((user) => (
                        <li
                            key={user._id}
                            className="flex justify-between items-center border p-2 rounded"
                        >
                            {user.username} ({user.userType})
                            <button
                                onClick={() => editUser(user)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
