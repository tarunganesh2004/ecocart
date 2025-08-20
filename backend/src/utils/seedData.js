import mongoose from 'mongoose'
import Product from '../models/Product.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import connectDB from '../db.js'

const seedData = async () => {
    try {
        await connectDB()

        // Clear existing data
        await Product.deleteMany()
        await User.deleteMany()

        // Seed products
        const products = [
            {
                name: 'Organic Cotton T-Shirt',
                description: '100% organic cotton, ethically sourced',
                price: 19.99,
                category: 'Clothing',
                ecoRating: 8,
                stock: 100,
                image: 'https://via.placeholder.com/150'
            },
            {
                name: 'Bamboo Toothbrush',
                description: 'Biodegradable bamboo handle',
                price: 4.99,
                category: 'Home',
                ecoRating: 9,
                stock: 200,
                image: 'https://via.placeholder.com/150'
            },
            {
                name: 'Solar Charger',
                description: 'Portable solar-powered phone charger',
                price: 29.99,
                category: 'Electronics',
                ecoRating: 7,
                stock: 50,
                image: 'https://via.placeholder.com/150'
            }
        ]

        await Product.insertMany(products)

        // Seed admin user
        const hashedPassword = await bcrypt.hash('admin123', 10)
        await User.create({
            email: 'admin@ecocart.com',
            password: hashedPassword,
            isAdmin: true
        })

        console.log('Database seeded successfully')
        process.exit()
    } catch (error) {
        console.error('Error seeding data:', error)
        process.exit(1)
    }
}

seedData()