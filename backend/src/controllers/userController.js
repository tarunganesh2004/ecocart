// @ts-nocheck
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ email, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: 'User registered' })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        res.json({ token, isAdmin: user.isAdmin })
    } catch (error) {
        next(error)
    }
}

export const getCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select('cart')
        res.json({ cart: user.cart })
    } catch (error) {
        next(error)
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body
        const user = await User.findById(req.user.userId)
        const cartItem = user.cart.find(item => item.productId.toString() === productId)
        if (cartItem) {
            cartItem.quantity = quantity
        } else {
            user.cart.push({ productId, quantity })
        }
        await user.save()
        res.json({ message: 'Cart updated', cart: user.cart })
    } catch (error) {
        next(error)
    }
}

export const deleteFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body
        const user = await User.findById(req.user.userId)
        user.cart = user.cart.filter(item => item.productId.toString() !== productId)
        await user.save()
        res.json({ message: 'Item removed from cart', cart: user.cart })
    } catch (error) {
        next(error)
    }
}

export const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select('wishlist')
        res.json({ wishlist: user.wishlist })
    } catch (error) {
        next(error)
    }
}

export const updateWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body
        const user = await User.findById(req.user.userId)
        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId)
            await user.save()
        }
        res.json({ message: 'Added to wishlist', wishlist: user.wishlist })
    } catch (error) {
        next(error)
    }
}

export const deleteFromWishlist = async (req, res, next) => {
    try {
        const { productId } = req.body
        const user = await User.findById(req.user.userId)
        user.wishlist = user.wishlist.filter(id => id.toString() !== productId)
        await user.save()
        res.json({ message: 'Item removed from wishlist', wishlist: user.wishlist })
    } catch (error) {
        next(error)
    }
}

export const checkout = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        user.cart = []
        await user.save()
        res.json({ message: 'Checkout successful' })
    } catch (error) {
        next(error)
    }
}