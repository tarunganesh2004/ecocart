import { Card, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'

function ProductCard({ product }) {
    const { addToCart, addToWishlist } = useContext(CartContext)

    return (
        <Card className="product-card h-100">
            <Card.Img
                variant="top"
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {formatCurrency(product.price)} | Eco Rating: {product.ecoRating}/10
                    <br />
                    {product.description}
                </Card.Text>
                <Button
                    variant="success"
                    className="me-2"
                    onClick={() => addToCart(product._id, 1)}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={() => addToWishlist(product._id)}
                >
                    Add to Wishlist
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard