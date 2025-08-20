import { Router } from 'express'
import {
    registerUser,
    loginUser,
    getCart,
    updateCart,
    deleteFromCart,
    getWishlist,
    updateWishlist,
    deleteFromWishlist,
    checkout
} from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/cart', protect, getCart)
router.put('/cart', protect, updateCart)
router.delete('/cart', protect, deleteFromCart)
router.get('/wishlist', protect, getWishlist)
router.post('/wishlist', protect, updateWishlist)
router.delete('/wishlist', protect, deleteFromWishlist)
router.post('/checkout', protect, checkout)

export default router