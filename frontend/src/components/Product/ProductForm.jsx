import { Form, Button, Container } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../../services/api'

function ProductForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {
        try {
            await api.post('/products', data)
            toast.success('Product added successfully')
            reset()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding product')
        }
    }

    return (
        <Container>
            <h2>Add Product</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        {...register('name', { required: 'Name is required' })}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        {...register('description')}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        {...register('price', { required: 'Price is required', min: 0 })}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        {...register('category', { required: 'Category is required' })}
                        isInvalid={!!errors.category}
                    >
                        <option value="">Select Category</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home">Home</option>
                        <option value="Electronics">Electronics</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.category?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Eco Rating (1-10)</Form.Label>
                    <Form.Control
                        type="number"
                        {...register('ecoRating', { required: 'Eco Rating is required', min: 1, max: 10 })}
                        isInvalid={!!errors.ecoRating}
                    />
                    <Form.Control.Feedback type="invalid">{errors.ecoRating?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        {...register('stock', { required: 'Stock is required', min: 0 })}
                        isInvalid={!!errors.stock}
                    />
                    <Form.Control.Feedback type="invalid">{errors.stock?.message}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        {...register('image')}
                        placeholder="Optional image URL"
                    />
                </Form.Group>
                <Button type="submit" variant="success">Add Product</Button>
            </Form>
        </Container>
    )
}

export default ProductForm