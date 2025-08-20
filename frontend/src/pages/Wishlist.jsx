import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import ProductCard from '../components/Product/ProductCard'
import Loader from '../components/Shared/Loader'
import api from '../services/api'
import { toast } from 'react-toastify'

function Wishlist() {
    const { wishlist, fetchCartAndWishlist } = useContext(CartContext)
    const { authTokens } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                if (wishlist.length) {
                    const response = await api.get('/products', { params: { ids: wishlist.join(',') } })
                    setProducts(response.data.products)
                } else {
                    setProducts([])
                }
            } catch (error) {
                toast.error('Error loading wishlist')
            }
            setLoading(false)
        }
        fetchProducts()
    }, [wishlist])

    const handleRemove = async (productId) => {
        try {
            await api.delete('/users/wishlist', {
                headers: { Authorization: `Bearer ${authTokens.token}` },
                data: { productId }
            })
            fetchCartAndWishlist()
            toast.success('Item removed from wishlist')
        } catch (error) {
            toast.error('Error removing item')
        }
    }

    return (
        <Container>
            <h2>Your Wishlist</h2>
            {loading ? (
                <Loader />
            ) : products.length === 0 ? (
                <Alert variant="info">Your wishlist is empty</Alert>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} md={4} className="mb-4">
                            <div className="position-relative">
                                <ProductCard product={product} />
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="position-absolute top-0 end-0 m-2"
                                    onClick={() => handleRemove(product._id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default Wishlist