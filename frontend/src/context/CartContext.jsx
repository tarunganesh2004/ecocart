import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [wishlist, setWishlist] = useState([])
    const { authTokens, user } = useContext(AuthContext)

    const addToCart = async (productId, quantity) => {
        if (!user) {
            toast.error('Please log in to add to cart')
            return
        }
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/users/cart`,
                { userId: user.userId, productId, quantity },
                { headers: { Authorization: `Bearer ${authTokens.token}` } }
            )
            setCart([...cart, { productId, quantity }])
            toast.success('Added to cart')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding to cart')
        }
    }

    const addToWishlist = async (productId) => {
        if (!user) {
            toast.error('Please log in to add to wishlist')
            return
        }
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/users/wishlist`,
                { userId: user.userId, productId },
                { headers: { Authorization: `Bearer ${authTokens.token}` } }
            )
            setWishlist([...wishlist, productId])
            toast.success('Added to wishlist')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding to wishlist')
        }
    }

    const fetchCartAndWishlist = async () => {
        if (!user) return
        try {
            const [cartRes, wishlistRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/users/cart`, {
                    headers: { Authorization: `Bearer ${authTokens.token}` }
                }),
                axios.get(`${import.meta.env.VITE_API_URL}/users/wishlist`, {
                    headers: { Authorization: `Bearer ${authTokens.token}` }
                })
            ])
            setCart(cartRes.data.cart)
            setWishlist(wishlistRes.data.wishlist)
        } catch (error) {
            toast.error('Error loading cart/wishlist')
        }
    }

    useEffect(() => {
        fetchCartAndWishlist()
    }, [user, authTokens])

    return (
        <CartContext.Provider value={{ cart, wishlist, addToCart, addToWishlist, fetchCartAndWishlist }}>
            {children}
        </CartContext.Provider>
    )
}