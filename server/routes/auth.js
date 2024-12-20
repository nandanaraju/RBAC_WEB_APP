require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Add User Route (Admin Only)
router.post('/add-user', verifyToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { username, password, email, userType } = req.body;

        if (!username || !password || !email || !userType) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, userType });
        await newUser.save();

        res.status(201).json({ message: `${userType} added successfully` });
    } catch (error) {
        console.error('Add user error:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Admin - Get All Users/Pharmacists
router.get('/users', verifyToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Edit User Route (Admin Only)
// Update User by Admin (PUT)
router.put('/users/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, userType, status } = req.body;

        // Find the user by ID and update fields
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, userType, status },
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete User Route (Admin Only)
router.delete('/users/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});


// Pharmacist - Manage Inventory (example endpoint)
router.get('/inventory', verifyToken, authorizeRoles('pharmacist'), async (req, res) => {
    res.json({ message: 'Pharmacist inventory data' });
});

// Sign Up Route
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, userType, adminPassphrase } = req.body;

        if (!username || !password || !email || !userType) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (userType === 'admin' && adminPassphrase !== process.env.ADMIN_PASSPHRASE) {
            return res.status(400).json({ error: 'Incorrect admin passphrase' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, userType });

        await newUser.save();

        res.status(201).json({ message: `${userType} registered successfully` });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed - User doesn\'t exist' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed - Password doesn\'t match' });
        }

        const token = jwt.sign(
            { userType: user.userType, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('Authtoken', token);
        res.json({
            status: true,
            message: 'Login successful',
            token,
            userType: user.userType,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie('Authtoken');
    res.status(200).send('Logout successful');
});

module.exports = router;
