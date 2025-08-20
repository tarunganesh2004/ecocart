import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap'
import ProductCard from '../components/Product/ProductCard'
import Loader from '../components/Shared/Loader'
import api from '../services/api'
import { toast } from 'react-toastify'

function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({ category: '', minEco: '', maxPrice: '', page: 1, limit: 9 })
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams(filters).toString()
                const response = await api.get(`/products?${params}`)
                setProducts(response.data.products)
                setTotalPages(response.data.totalPages)
            } catch (error) {
                toast.error('Error loading products')
            }
            setLoading(false)
        }
        fetchProducts()
    }, [filters])

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 })
    }

    const handlePageChange = (page) => {
        setFilters({ ...filters, page })
    }

    return (
        <Container>
            <h2>Shop Eco-Friendly Products</h2>
            <Form className="mb-4">
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category" onChange={handleFilterChange}>
                                <option value="">All Categories</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home">Home</option>
                                <option value="Electronics">Electronics</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Min Eco Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="minEco"
                                placeholder="1-10"
                                min="1"
                                max="10"
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Max Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxPrice"
                                placeholder="$"
                                min="0"
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} md={4} className="mb-4">
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Pagination className="justify-content-center">
                        {[...Array(totalPages).keys()].map((page) => (
                            <Pagination.Item
                                key={page + 1}
                                active={page + 1 === filters.page}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </>
            )}
        </Container>
    )
}

export default ProductList