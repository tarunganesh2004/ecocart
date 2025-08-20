import { Router } from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/auth.js'

const router = Router()

router.get('/', getProducts)
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)

export default router