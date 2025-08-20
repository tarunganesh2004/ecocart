import Product from '../models/Product.js'

export const getProducts = async (req, res, next) => {
    try {
        const { category, minEco, maxPrice, page = 1, limit = 9, ids } = req.query
        let filter = {}
        if (category) filter.category = category
        if (minEco) filter.ecoRating = { $gte: parseInt(minEco) }
        if (maxPrice) filter.price = { $lte: parseInt(maxPrice) }
        if (ids) filter._id = { $in: ids.split(',') }

        const products = await Product.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
        const count = await Product.countDocuments(filter)

        res.json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        })
    } catch (error) {
        next(error)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body)
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json(product)
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.json({ message: 'Product deleted' })
    } catch (error) {
        next(error)
    }
}