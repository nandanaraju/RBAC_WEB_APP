import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const [status, setStatus] = useState("active");

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (error) {
            toast.error("Error fetching users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Add User
    const addUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/add-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, userType, status }),
                credentials: "include",
            });
            if (res.ok) {
                toast.success("User added successfully");
                fetchUsers();
                resetForm();
            } else {
                toast.error("Failed to add user");
            }
        } catch (error) {
            toast.error("Error adding user");
        }
    };

    // Edit User
    const editUser = (user) => {
        setEditingUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setUserType(user.userType);
        setStatus(user.status);
    };

    // Update User
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/users/${editingUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, userType, status }),
                credentials: "include",
            });
            if (res.ok) {
                toast.success("User updated successfully");
                fetchUsers();
                resetForm();
            } else {
                toast.error("Failed to update user");
            }
        } catch (error) {
            toast.error("Error updating user");
        }
    };

    // Delete User
    const deleteUser = async (id) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (res.ok) {
                toast.success("User deleted successfully");
                fetchUsers();
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            toast.error("Error deleting user");
        }
    };

    // Reset Form
    const resetForm = () => {
        setEditingUser(null);
        setUsername("");
        setEmail("");
        setPassword("");
        setUserType("user");
        setStatus("active");
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
            <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", backgroundColor: "#ffffff", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }}>
                <h1 style={{ textAlign: "center", color: "#000", fontSize: "24px", marginBottom: "20px" }}>User Management</h1>

                {/* Add/Edit User Form */}
                <form
                    onSubmit={editingUser ? updateUser : addUser}
                    style={{
                        padding: "20px",
                        backgroundColor: "#eeeeee",
                        borderRadius: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <h2 style={{ fontSize: "18px", marginBottom: "10px", color: "#333" }}>
                        {editingUser ? "Edit User" : "Add a user"}
                    </h2>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Username*</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                            required
                        />
                        <label>Email*</label>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                            required
                        />
                        <label>Password*</label>
                        {!editingUser && (
                            
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    marginBottom: "10px",
                                }}
                                required
                            />
                        )}
                        <label>UserType*</label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        >
                            <option value="user">User</option>
                            <option value="pharmacist">Pharmacist</option>
                        </select>
                        <label >Status*</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                        }}
                    >
                        {editingUser ? "Update" : "Add a new user"}
                    </button>
                </form>

                {/* Users List */}
                <h2 style={{ fontSize: "18px", marginBottom: "10px", color: "#333" }}>Manage Users</h2>
                <div>
                    {Array.isArray(users) &&
                        users.map((user) => (
                            <div
                                key={user._id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px",
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: "5px",
                                    border: "1px solid #ddd",
                                    marginBottom: "10px",
                                }}
                            >
                                <div>
                                    <span style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
                                        {user.username} ({user.userType})
                                    </span>
                                    <span style={{ display: "block", fontSize: "14px", color: "#666" }}>
                                        Status: {user.status}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => editUser(user)}
                                        style={{
                                            backgroundColor: "#ffc107",
                                            color: "#fff",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        style={{
                                            backgroundColor: "#dc3545",
                                            color: "#fff",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
