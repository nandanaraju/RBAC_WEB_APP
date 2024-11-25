import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user");

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            toast.error("Failed to fetch users");
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
                fetchUsers(); // Refresh user list
            } else {
                toast.error("Failed to add user");
            }
        } catch (error) {
            toast.error("Error adding user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={addUser}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="pharmacist">Pharmacist</option>
                </select>
                <button type="submit">Add</button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.username} ({user.userType})</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
