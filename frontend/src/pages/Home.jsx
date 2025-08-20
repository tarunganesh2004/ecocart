import { Container, Jumbotron, Button } from 'react-bootstrap'

function Home() {
    return (
        <Container>
            <Jumbotron className="text-center mt-4">
                <h1>EcoCart</h1>
                <p>Shop sustainably with eco-friendly products ranked by sustainability.</p>
                <Button variant="success" href="/products">Start Shopping</Button>
            </Jumbotron>
        </Container>
    )
}

export default Home