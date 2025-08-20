import { Container, Button } from 'react-bootstrap'

function Home() {
    return (
        <Container className="p-5 mb-4 bg-light rounded-3 text-center mt-4">
            <h1>EcoCart</h1>
            <p>Shop sustainably with eco-friendly products ranked by sustainability.</p>
            <Button variant="success" href="/products">Start Shopping</Button>
        </Container>
    )
}

export default Home
