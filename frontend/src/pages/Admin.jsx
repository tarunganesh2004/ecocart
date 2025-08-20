import { useContext } from 'react'
import { Container, Alert } from 'react-bootstrap'
import ProductForm from '../components/Product/ProductForm'
import { AuthContext } from '../context/AuthContext'

function Admin() {
    const { user } = useContext(AuthContext)

    return (
        <Container>
            <h2>Admin Panel</h2>
            {user?.isAdmin ? (
                <ProductForm />
            ) : (
                <Alert variant="danger">Access denied. Admin privileges required.</Alert>
            )}
        </Container>
    )
}

export default Admin