import { useContext, useEffect, useState } from 'react'
import { Container, Table, Button, Alert } from 'react-bootstrap'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import api from '../services/api'
import { formatCurrency } from '../utils/formatCurrency'
import { toast } from 'react-toastify'
import Loader from '../components/Shared/Loader'

function Cart() {
    const { cart, fetchCartAndWishlist } = useContext(CartContext)
    const { authTokens } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const productIds = cart.map(item => item.productId)
                if (productIds.length) {
                    const response = await api.get('/products', { params: { ids: productIds.join(',') } })
                    setProducts(response.data.products.map(product => ({
                        ...product,
                        quantity: cart.find(item => item.productId === product._id).quantity
                    })))
                } else {
                    setProducts([])
                }
            } catch (error) {
                toast.error('Error loading cart items')
            }
            setLoading(false)
        }
        fetchProducts()
    }, [cart])

    const handleCheckout = async () => {
        try {
            await api.post('/users/checkout', { cart }, {
                headers: { Authorization: `Bearer ${authTokens.token}` }
            })
            toast.success('Checkout successful!')
            setProducts([])
            fetchCartAndWishlist() // Refresh cart
        } catch (error) {
            toast.error('Checkout failed')
        }
    }

    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            await api.put('/users/cart', { productId, quantity }, {
                headers: { Authorization: `Bearer ${authTokens.token}` }
            })
            fetchCartAndWishlist()
            toast.success('Cart updated')
        } catch (error) {
            toast.error('Error updating cart')
        }
    }

    const handleRemove = async (productId) => {
        try {
            await api.delete('/users/cart', {
                headers: { Authorization: `Bearer ${authTokens.token}` },
                data: { productId }
            })
            fetchCartAndWishlist()
            toast.success('Item removed from cart')
        } catch (error) {
            toast.error('Error removing item')
        }
    }

    const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <Container>
            <h2>Your Cart</h2>
            {loading ? (
                <Loader />
            ) : products.length === 0 ? (
                <Alert variant="info">Your cart is empty</Alert>
            ) : (
                <>
                    <Table striped bordered hover responsive className="mt-4">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{formatCurrency(item.price)}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            style={{ width: '80px' }}
                                            onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>{formatCurrency(item.price * item.quantity)}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemove(item._id)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h4 className="text-end">Total: {formatCurrency(total)}</h4>
                    <Button
                        variant="success"
                        className="float-end mt-3"
                        onClick={handleCheckout}
                        disabled={products.length === 0}
                    >
                        Proceed to Checkout
                    </Button>
                </>
            )}
        </Container>
    )
}

export default Cart