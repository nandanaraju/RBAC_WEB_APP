const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const {verifyToken,authorizeRoles} = require('../middleware/authMiddleware');

// Add product to cart
router.post('/add/:id/:quantity',verifyToken,authorizeRoles('user'), async (req, res) => {
    const { id, quantity } = req.params;

    if (!id || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    try {
        const product = await Product.findOne({ productId: id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existingProduct = user.cart.find(item => item.productId == id);
        const parsedQuantity = Number(quantity);

        if (existingProduct) {
            existingProduct.quantity += parsedQuantity;

            // Ensure product quantity in inventory is reduced accordingly
            if (product.productQuantity < parsedQuantity) {
                return res.status(400).json({ error: 'Insufficient product quantity in inventory' });
            }
            product.productQuantity -= parsedQuantity;
        } else {
            if (product.productQuantity < parsedQuantity) {
                return res.status(400).json({ error: 'Insufficient product quantity in inventory' });
            }

            user.cart.push({ productId: id, quantity: parsedQuantity });
            product.productQuantity -= parsedQuantity;
        }

        await user.save();
        await product.save();

        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

// Update product quantity in cart
router.put('/update/:id/:quantity',verifyToken,authorizeRoles('user'), async (req, res) => {
    const { id, quantity } = req.params;

    if (!id || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const productInCart = user.cart.find(item => item.productId == id);
        if (!productInCart) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        const product = await Product.findOne({ productId: id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const newQuantity = Number(quantity);
        if (newQuantity < 0 || product.productQuantity + productInCart.quantity < newQuantity) {
            return res.status(400).json({ error: 'Invalid quantity or insufficient stock' });
        }

        product.productQuantity += productInCart.quantity - newQuantity;
        productInCart.quantity = newQuantity;

        await user.save();
        await product.save();

        res.json({ message: 'Cart updated', cart: user.cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
    }
});

// Remove product from cart
router.delete('/remove/:id',verifyToken,authorizeRoles('user'), async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const productInCart = user.cart.find(item => item.productId == id);
        if (!productInCart) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        const product = await Product.findOne({ productId: id });
        if (product) {
            product.productQuantity += productInCart.quantity;
            await product.save();
        }

        user.cart = user.cart.filter(item => item.productId !== id);
        await user.save();

        res.json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
});

module.exports = router;
