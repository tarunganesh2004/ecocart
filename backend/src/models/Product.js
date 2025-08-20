import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: ['Clothing', 'Home', 'Electronics'] },
    ecoRating: { type: Number, required: true, min: 1, max: 10 },
    image: { type: String },
    stock: { type: Number, required: true, min: 0 }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)