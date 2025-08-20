import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Admin from './pages/Admin'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar bg="success" variant="dark" expand="lg" sticky="top">
            <Container>
              <Navbar.Brand href="/">EcoCart</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/products">Shop</Nav.Link>
                  <Nav.Link href="/cart">Cart</Nav.Link>
                  <Nav.Link href="/wishlist">Wishlist</Nav.Link>
                  <Nav.Link href="/admin">Admin</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App