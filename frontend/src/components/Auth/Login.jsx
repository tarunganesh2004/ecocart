import { useContext } from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { login } = useContext(AuthContext)

    const onSubmit = (data) => login(data.email, data.password)

    return (
        <Container className="mt-4">
            <Card className="p-4 mx-auto" style={{ maxWidth: '400px' }}>
                <h2 className="mb-4">Login</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="success" className="w-100">Login</Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Login